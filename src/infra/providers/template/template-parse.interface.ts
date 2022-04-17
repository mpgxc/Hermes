export type TemplateMailProps = Record<string, string | number | boolean>;

export type ParseTemplateMail = {
  file: string;
  props: TemplateMailProps;
};

export interface ITemplateParseProvider {
  parse(data: ParseTemplateMail): Promise<string>;
}
