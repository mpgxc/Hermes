import { Type } from 'class-transformer';
import {
  IsUUID,
  IsEmail,
  IsArray,
  IsObject,
  IsString,
  IsNotEmpty,
  ArrayMinSize,
  ValidateNested,
  IsOptional,
} from 'class-validator';

type TemplateProps = Record<string, string | number | boolean>;

export class MailAddress {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  address: string;
}

export class MailMessageInput {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MailAddress)
  recipients: Array<MailAddress>;

  @IsObject()
  @IsOptional()
  templateProps: TemplateProps;

  @IsNotEmpty()
  @IsUUID()
  templateId: string;
}
