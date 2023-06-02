import { Controller, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FileUpdateService } from 'src/services/file-update/file-update.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Files') // Agrega una etiqueta al controlador para agruparlo en la documentación
@Controller('file-category')
export class FileUpdateController {
  constructor(private readonly fileUpdateService: FileUpdateService) {}

  @ApiOperation({ summary: 'Actualizar archivo solo con otro de su categoria', description: 'Actualiza o reemplaza un archivo por su ID' }) // Agrega una descripción al endpoint
  @ApiParam({ name: 'id', description: 'ID del archivo', example: '647a69d038e92df93fb8b36a' }) // Documenta el parámetro 'id'
  @ApiResponse({ status: 200, description: 'Archivo actualizado correctamente', type: Object }) // Documenta la respuesta exitosa
  @ApiResponse({ status: 400, description: 'Solicitud inválida' }) // Documenta el error en la solicitud
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
