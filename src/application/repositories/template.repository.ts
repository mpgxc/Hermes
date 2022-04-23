import { Injectable } from '@nestjs/common';

import { TemplateMapper } from 'application/mappers/template.mapper';
import { Maybe } from 'commons/logic';
import { Template, TemplateProps } from 'domain/entities/template';
import {
  ITemplateRespository,
  TemplateFindByUnique,
} from 'domain/repositories/template.repository';
import { PrismaService } from 'infra/database/prisma.service';

@Injectable()
class TemplateRespository implements ITemplateRespository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: TemplateMapper,
  ) {}

  async findByUnique({
    subject,
    slug,
  }: TemplateFindByUnique): Promise<boolean> {
    const template = await this.prisma.template.findFirst({
      where: {
        NOT: { is_active: false },
        OR: [
          {
            slug,
          },
          {
            subject,
          },
        ],
      },
    });

    return !!template;
  }

  async create(item: Template): Promise<void> {
    await this.prisma.template.create({
      data: this.mapper.toPersistence(item),
    });
  }

  async list(): Promise<TemplateProps[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Maybe<Template>> {
    const template = await this.prisma.template.findUnique({
      where: { id },
    });

    return template ? this.mapper.toDomain(template) : null;
  }

  async findByIdRender(id: string): Promise<TemplateProps> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async update(item: Template): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { TemplateRespository };
