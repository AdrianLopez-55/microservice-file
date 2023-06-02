import { Controller, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FileDeleteService } from 'src/services/file-delete/file-delete.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('file')
export class FileDeleteController {
  constructor(private readonly fileDeleteService: FileDeleteService) {}

  @ApiOperation({ summary: 'Eliminar archivo', description: 'Elimina un archivo por su ID' })
  @ApiParam({ name: 'id', description: 'ID del archivo', example: '1647a69d038e92df93fb8b36a' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Archivo eliminado correctamente' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor' })
  @Delete(':id')
  async deleteFile(@Param('id') fileId: string) {
    try {
      await this.fileDeleteService.deleteFile(fileId);
      return { message: 'Archivo eliminado correctamente' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
