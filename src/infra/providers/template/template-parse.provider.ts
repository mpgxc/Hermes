import { Injectable } from '@nestjs/common';

import handlebars from 'handlebars';

import {
  ParseTemplateMail,
  ITemplateParseProvider,
} from './template-parse.interface';

@Injectable()
export class TemplateParseProvider implements ITemplateParseProvider {
  async parse({ file, props }: ParseTemplateMail): Promise<string> {
    return handlebars.compile(file)(props);
  }
}
