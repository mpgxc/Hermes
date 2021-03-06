import {
  Body,
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { TemplateErrors } from 'application/errors/template.erros';
import { CreateTemplateMail } from 'application/use-cases/create-template-mail';
import { FileUpload } from 'infra/providers/storage/storage-files.interface';

import { TemplateInput } from '../inputs/template.inputs';

@Controller('templates')
export class TemplateController {
  constructor(private readonly createTemplateMail: CreateTemplateMail) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('template'))
  async uploadFile(
    @Body() body: TemplateInput,
    @UploadedFile() templateFile: FileUpload,
  ): Promise<void> {
    if (!templateFile) {
      throw new BadRequestException(
        'template file is required',
        'validation failed',
      );
    }

    const { subject, title, description } = body;

    const result = await this.createTemplateMail.handle({
      title,
      subject,
      description,
      templateFile,
    });

    if (!result.hasError) return;

    switch (result.value.constructor) {
      case TemplateErrors.TemplateAlreadyExists:
        throw new ConflictException(result.value.message);

      default:
        throw new BadRequestException('Error Inesperado!');
    }
  }
}
