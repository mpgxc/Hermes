import { Injectable } from '@nestjs/common';

import { TemplateMapper } from 'application/mappers/template.mapper';
import { Maybe } from 'commons/logic';
import { Template } from 'domain/entities/template';
import { AbstractTemplateRepository } from 'domain/repositories/template.repository';
import { PrismaService } from 'infra/database/prisma.service';

interface ITemplateRespository {
  findBySlug(slug: string): Promise<Maybe<Template>>;

  findBySubject(subject: string): Promise<Maybe<Template>>;
}

@Injectable()
class TemplateRespository
  extends AbstractTemplateRepository
  implements ITemplateRespository
{
  constructor(prisma: PrismaService, mapper: TemplateMapper) {
    super(prisma.template, mapper);
  }

  async create(item: Template): Promise<void> {
    await this.repository.create({
      data: this.mapper.toPersistence(item),
    });
  }

  async findBySlug(slug: string): Promise<Maybe<Template>> {
    const data = await this.repository.findUnique({
      where: {
        slug,
      },
    });

    return data ? this.mapper.toDomain(data) : null;
  }

  async findBySubject(subject: string): Promise<Maybe<Template>> {
    const data = await this.repository.findUnique({
      where: {
        subject,
      },
    });

    return data ? this.mapper.toDomain(data) : null;
  }
}

export { TemplateRespository };
