export type MailMessageInput = {
  subject: string;
  emails: Array<string>;
  templateProps: Record<string, string | number | boolean>;
  templateId: string;
};

export type MailMessage = {
  email: string;
  subject: string;
  template: string;
};
