export type TemplateMailProps = Record<string, string | number | boolean>;

export type ParseTemplateMail = {
  templateId: string;
  templateProps: TemplateMailProps;
};

export interface ITemplateParseProvider {
  parse(data: ParseTemplateMail): Promise<string>;
}
