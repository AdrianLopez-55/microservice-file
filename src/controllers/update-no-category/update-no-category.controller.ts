import { Controller, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FileUpdateNoCatService } from 'src/services/update-no-category/update-no-category.service';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiProduces, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Files') // Agrega una etiqueta al controlador para agruparlo en la documentación
@Controller('file')
export class FileUpdateNoCatController {
  constructor(private readonly fileUpdateService: FileUpdateNoCatService) {}

  @ApiOperation({ summary: 'Actualizar archivo', description: 'Actualiza un archivo por su ID, permitiendo solo reemplazos de la misma categoría' }) // Agrega una descripción al endpoint
  @ApiParam({ name: 'id', description: 'ID del archivo', example: '123' }) // Documenta el parámetro 'id'
  @ApiConsumes('application/json') // Especifica el tipo de contenido que consume el endpoint
  @ApiProduces('application/json') // Especifica el tipo de contenido que produce el endpoint
  @ApiResponse({ status: HttpStatus.OK, description: 'Archivo actualizado correctamente' }) // Documenta la respuesta exitosa
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Error al actualizar el archivo' }) // Documenta el error en la solicitud
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
