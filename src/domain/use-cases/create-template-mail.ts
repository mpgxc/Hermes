type FileUpload = {
  path: string;
  mimetype: string;
  filename: string;
};

type CreateTemplateMailInput = {
  title: string;
  subject: string;
  templateFile: FileUpload;
  description?: string;
};

/**
 * Padrão de retorno como void para Commands
 */
interface ICreateTemplateMail<Response = void> {
  handle(props: CreateTemplateMailInput): Promise<Response>;
}

export { ICreateTemplateMail, CreateTemplateMailInput, FileUpload };
