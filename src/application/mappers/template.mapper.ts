import { Injectable } from '@nestjs/common';
import { Template as TemplateResponse } from '@prisma/client';

import { IMapper } from 'commons/abstract/mapper.interface';
import { Template } from 'domain/entities/template';

@Injectable()
class TemplateMapper implements IMapper<Template, TemplateResponse> {
  toDomain(data: TemplateResponse): Template {
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

  toPersistence(data: Template): Partial<TemplateResponse> {
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
