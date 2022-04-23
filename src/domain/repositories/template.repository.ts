import { IReadRepository, IWriteRepository } from 'commons/application';
import { Template, TemplateProps } from 'domain/entities/template';

type TemplateFindByUnique = {
  subject: string;
  slug: string;
};

interface ITemplateRespository
  extends IWriteRepository<Template>,
    IReadRepository<Template, TemplateProps> {
  findByUnique(filter: TemplateFindByUnique): Promise<boolean>;
}

export { ITemplateRespository, TemplateFindByUnique };
