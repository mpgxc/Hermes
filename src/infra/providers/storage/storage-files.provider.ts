import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { initializeApp } from 'firebase/app';
import {
  ref,
  getStorage,
  uploadBytes,
  FirebaseStorage,
} from 'firebase/storage';
import * as fs from 'node:fs';
import { v4 as uuid } from 'uuid';

import {
  FileUpload,
  DestinationFile,
  IStorageFilesProvider,
} from './storage-files.interface';

@Injectable()
export class StorageFilesProvider implements IStorageFilesProvider {
  private readonly storage: FirebaseStorage;

  constructor(private readonly configService: ConfigService) {
    const firebaseConfig = {
      apiKey: this.configService.get<string>('FIREBASE_API_KEY'),
      authDomain: this.configService.get<string>('FIREBASE_AUTH_DOMAIN'),
      databaseURL: this.configService.get<string>('FIREBASE_DATABASE_URL'),
      storageBucket: this.configService.get<string>('FIREBASE_STORAGE_BUCKET'),
    };

    const app = initializeApp(firebaseConfig);

    this.storage = getStorage(app);
  }

  private resolveTokenName(destination: DestinationFile) {
    const fileToken = uuid();

    const extensionFile = destination === 'images' ? 'jpg' : 'html';

    const fileName = `${fileToken}.${extensionFile}`;

    return {
      fileName,
      fileToken,
    };
  }

  async save(destination: DestinationFile, file: FileUpload): Promise<string> {
    const { fileToken, fileName } = this.resolveTokenName(destination);

    const metadata = {
      contentType: file.mimetype,
      metadata: {
        firebaseStorageDownloadTokens: fileToken,
      },
    };

    const bufferFile = fs.readFileSync(file.path);

    await uploadBytes(
      ref(this.storage, `${destination}/${fileName}`),
      bufferFile,
      metadata,
    );

    await fs.promises.unlink(file.path);

    return fileToken;
  }

  async remove(destination: DestinationFile, file: FileUpload): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
