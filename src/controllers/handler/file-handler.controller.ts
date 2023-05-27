import { Controller, Get, Param } from '@nestjs/common';
import { FilehandlerService } from 'src/services/file-handler/file-handler.service';

@Controller('file-handler')
export class FileHandlerController {
  constructor(private readonly filehandlerService: FilehandlerService) {}

  @Get(':filename')
  getFile(@Param('filename') filename: string): { file: string } {
    const fileBase64 = this.filehandlerService.getFileBase64(filename);
    return { file: fileBase64 };
  }
}
