import { AppError } from 'commons/logic';

/* eslint-disable @typescript-eslint/no-namespace */
export namespace TemplateErrors {
  export class TemplateAlreadyExists extends AppError {
    constructor(value: string) {
      super(
        `The template ${value} already registered!`,
        'TemplateAlreadyExists',
      );
    }
  }
}
