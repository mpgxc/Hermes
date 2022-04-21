import { ConflictException, Injectable } from '@nestjs/common';

import { TemplateRespository } from 'application/repositories/template.repository';
import { Template } from 'domain/entities/template';
import {
  ICreateTemplateMail,
  CreateTemplateMailInput,
} from 'domain/use-cases/create-template-mail';
import { SlugProvider } from 'infra/providers/slug/slug.provider';
import { StorageFilesProvider } from 'infra/providers/storage/storage-files.provider';

@Injectable()
class CreateTemplateMail implements ICreateTemplateMail {
  constructor(
    private readonly storage: StorageFilesProvider,
    private readonly repository: TemplateRespository,
    private readonly slugger: SlugProvider,
  ) {}

  async handle({
    title,
    subject,
    description,
    templateFile,
  }: CreateTemplateMailInput): Promise<void> {
    const slug = this.slugger.generate(title);

    const templateExists = await Promise.all([
      this.repository.findBySlug(slug),
      this.repository.findBySubject(subject),
    ]);

    if (templateExists.some(Boolean)) {
      throw new ConflictException('Template already exists!');
    }

    const template_url = await this.storage.save('templates', templateFile);

    const template = Template.build({
      slug,
      title,
      subject,
      description,
      template_url,
    });

    await this.repository.create(template);
  }
}

export { CreateTemplateMail };
