import { Injectable } from '@nestjs/common';
import { Template as TemplateResponse } from '@prisma/client';

import { IMapper } from 'commons/application';
import { Template } from 'domain/entities/template';

type TemplatePersistence = {
  id: string;
  title: string;
  subject: string;
  slug: string;
  template_url: string;
  description?: string;
};

@Injectable()
class TemplateMapper
  implements IMapper<Template, TemplatePersistence | TemplateResponse>
{
  toDomain(data: TemplatePersistence): Template {
    return Template.build(
      {
        ...data,
      },
      data.id,
    );
  }

  toRender(data: TemplateResponse): Partial<TemplateResponse> {
    return {
      ...data,
    };
  }

  toPersistence(data: Template): TemplatePersistence {
    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      subject: data.subject,
      description: data.description,
      template_url: data.template_url,
    };
  }
}

export { TemplateMapper };
