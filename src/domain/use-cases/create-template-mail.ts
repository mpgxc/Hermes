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

interface ICreateTemplateMail {
  handle(props: CreateTemplateMailInput): Promise<void>;
}

export { ICreateTemplateMail, CreateTemplateMailInput, FileUpload };
