import {
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileUpload } from 'infra/providers/storage/storage-files.interface';
import { StorageFilesProvider } from 'infra/providers/storage/storage-files.provider';

@Controller('templates')
export class TemplateController {
  constructor(private readonly storageFilesProvider: StorageFilesProvider) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: FileUpload) {
    await this.storageFilesProvider.save('templates', file);
  }
}
