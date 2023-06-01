import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { FileRequest } from 'src/services/file-request/file-request.service';

@Controller('file')
export class FilesReqController {
  constructor(private readonly fileRequest: FileRequest) {}

  @Get(':id')
  async getFileById(@Param('id') id: string) {
    try {
      const file = await this.fileRequest.getFileById(id);
      if ('message' in file) {
        return { message: file.message };
      }
      return { file };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
