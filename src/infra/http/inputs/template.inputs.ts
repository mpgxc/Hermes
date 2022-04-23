import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class TemplateInput {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
