export type MailAddress = {
  name: string;
  address: string;
};

export type MailMessageInput = {
  subject: string;
  recipients: Array<MailAddress>;
  templateProps: Record<string, string | number | boolean>;
  templateId: string;
};

export type MailMessage = {
  to: MailAddress;
  subject: string;
  template: string;
};
