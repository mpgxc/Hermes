/* eslint-disable @typescript-eslint/ban-types */
import { BaseAbstractRepository } from 'commons/abstract/base-abstract-repository';
import { Template } from 'domain/entities/template';

type TemplateResponseRender = {};

abstract class AbstractTemplateRepository extends BaseAbstractRepository<
  Template,
  TemplateResponseRender
> {
  abstract create(item: Template): Promise<void>;
}

export { AbstractTemplateRepository };
