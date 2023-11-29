import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { FileRequest } from 'src/services/file-request/file-request.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Files') // Agrega una etiqueta al controlador para agruparlo en la documentación
@Controller('file')
export class FilesReqController {
  constructor(private readonly fileRequest: FileRequest) {}

  @ApiOperation({
    summary: 'Obtener archivo por ID',
    description: 'Obtiene un archivo por su ID',
  }) // Agrega una descripción al endpoint
  @ApiParam({
    name: 'id',
    description: 'ID del archivo',
    example: '647a69d038e92df93fb8b36a',
  }) // Documenta el parámetro 'id'
  @ApiResponse({ status: 200, description: 'Archivo encontrado', type: Object }) // Documenta la respuesta exitosa
  @ApiResponse({ status: 404, description: 'Archivo no encontrado' }) // Documenta el error en la solicitud
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

  @ApiOperation({
    summary: 'obtener un template por id',
    description: 'obtiene un archivo template por su ID',
  })
  @ApiResponse({ status: 200, description: 'archivo encontrado', type: Object })
  @ApiResponse({ status: 40, description: 'archivo no encontrado' })
  @Get('template/:id')
  async getTemplateFileById(@Param('id') id: string) {
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
