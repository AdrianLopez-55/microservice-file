import { Controller, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FileUpdateNoCatService } from 'src/services/update-no-category/update-no-category.service';

@Controller('file')
export class FileUpdateNoCatController {
  constructor(private readonly fileUpdateService: FileUpdateNoCatService) {}

  @Post('update/:id')
  async updateFile(@Param('id') fileId: string, @Body() body: { file: { mime: string, base64: string } }) {
    const fileData = body.file;

    try {
      // Llamar al método del servicio para actualizar el archivo en la base de datos y el sistema de archivos
      const updatedFile = await this.fileUpdateService.updateFile(fileId, fileData);

      return { message: 'Archivo actualizado correctamente', updatedFile };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
