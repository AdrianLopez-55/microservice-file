import { Controller, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FileDeleteService } from 'src/services/file-delete/file-delete.service';
@Controller('file')
export class FileDeleteController {
  constructor(private readonly filesService: FileDeleteService) {}

  @Delete(':id')
  async deleteFile(@Param('id') fileId: string) {
    try {
      await this.filesService.deleteFile(fileId);
      return { message: 'Archivo eliminado correctamente' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
