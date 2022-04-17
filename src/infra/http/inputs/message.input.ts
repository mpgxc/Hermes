import {
  IsEmail,
  IsArray,
  IsString,
  IsNotEmpty,
  ArrayMinSize,
  IsObject,
  IsUUID,
} from 'class-validator';

type TemplateProps = Record<string, string | number | boolean>;

export class MailMessageInput {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @IsEmail({}, { each: true })
  emails: Array<string>;

  @IsObject()
  templateProps: TemplateProps;

  @IsNotEmpty()
  @IsUUID()
  templateId: string;
}
