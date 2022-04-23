import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from 'infra/database/prisma.service';
import { SlugProvider } from 'infra/providers/slug/slug.provider';
import { StorageFilesProvider } from 'infra/providers/storage/storage-files.provider';

import { TemplateMapper } from './mappers/template.mapper';
import { TemplateRespository } from './repositories/template.repository';
import { CreateTemplateMail } from './use-cases/create-template-mail';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    PrismaService,
    TemplateMapper,
    CreateTemplateMail,
    TemplateRespository,
    StorageFilesProvider,
    SlugProvider,
  ],
  exports: [CreateTemplateMail, TemplateRespository],
})
export class ApplicationModule {}
