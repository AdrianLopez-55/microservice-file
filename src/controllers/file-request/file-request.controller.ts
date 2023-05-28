import { Controller, Get, Param } from '@nestjs/common';
import { FileRequest } from 'src/services/file-request/file-request.service';

@Controller('file-req')
export class FilesReqController {
  constructor(private readonly fileRequest: FileRequest) {}

  @Get(':id')
  async getFileById(@Param('id') id: string) {
    const file = await this.fileRequest.getFileById(id);
    if (!file) {
      throw new Error('Archivo no encontrado');
    }

    const { filePath, extension } = file;
    const fileData = this.fileRequest.getFileData(filePath, extension);

    return { file: fileData };
  }
}
