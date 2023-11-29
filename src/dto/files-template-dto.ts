import { ApiProperty } from '@nestjs/swagger';

export class FileTemplateDto {
  @ApiProperty()
  mime: string;

  @ApiProperty()
  base64: string;
}

export class TemplateDto {
  @ApiProperty()
  templateName: string;

  @ApiProperty({ type: FileTemplateDto })
  file: FileTemplateDto;
}
