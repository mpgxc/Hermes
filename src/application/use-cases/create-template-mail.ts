import { Injectable } from '@nestjs/common';

import { TemplateRespository } from 'application/repositories/template.repository';
import { Either, failure } from 'commons/logic';
import { Template } from 'domain/entities/template';
import {
  ICreateTemplateMail,
  CreateTemplateMailInput,
} from 'domain/use-cases/create-template-mail';
import { SlugProvider } from 'infra/providers/slug/slug.provider';
import { StorageFilesProvider } from 'infra/providers/storage/storage-files.provider';

import { TemplateErrors } from '../errors/template.erros';

type CreateTemplateMailOutput = Either<
  void,
  TemplateErrors.TemplateAlreadyExists
>;

@Injectable()
class CreateTemplateMail
  implements ICreateTemplateMail<CreateTemplateMailOutput>
{
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
  }: CreateTemplateMailInput): Promise<CreateTemplateMailOutput> {
    const slug = this.slugger.generate(title);

    const templateExists = await this.repository.findByUnique({
      slug,
      subject,
    });

    if (templateExists) {
      return failure(new TemplateErrors.TemplateAlreadyExists(slug));
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
