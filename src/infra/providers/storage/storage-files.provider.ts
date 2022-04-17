import { Injectable } from '@nestjs/common';

import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import * as fs from 'node:fs';
import { v4 as uuid } from 'uuid';

import {
  DestinationFile,
  FileUpload,
  IStorageFilesProvider,
} from './storage-files.interface';

@Injectable()
export class StorageFilesProvider implements IStorageFilesProvider {
  private storage: any;

  constructor() {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
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

    return `${fileName}?alt=media&token=${fileToken}`;
  }

  async remove(destination: DestinationFile, file: FileUpload): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
