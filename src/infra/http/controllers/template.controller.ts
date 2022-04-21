import {
  Body,
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateTemplateMail } from 'application/use-cases/create-template-mail';
import { FileUpload } from 'infra/providers/storage/storage-files.interface';

import { TemplateInput } from '../inputs/template.inputs';

@Controller('templates')
export class TemplateController {
  constructor(private readonly createTemplateMail: CreateTemplateMail) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('template'))
  async uploadFile(
    @Body() { subject, title, description }: TemplateInput,
    @UploadedFile() templateFile: FileUpload,
  ): Promise<void> {
    if (!templateFile) {
      throw new BadRequestException(
        'template file is required',
        'validation failed',
      );
    }

    await this.createTemplateMail.handle({
      title,
      subject,
      description,
      templateFile,
    });
  }
}
