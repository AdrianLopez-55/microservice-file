import { Controller, Post, Body } from '@nestjs/common';
import { FilesService } from 'src/services/uploads/files.services';
import { v4 as uuidv4 } from 'uuid';
import { ApiBody, ApiHeader, ApiOperation } from '@nestjs/swagger';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({ summary: 'Subir un archivo', description: 'Sube un archivo en base 64. Se puede usar este conversor online utilizando el formato JSON de salida para subir correctamente el archivo al servidor https://base64.guru/converter/encode/file' })
   @ApiHeader({
    name: 'Content-Type',
    description: 'Tipo de contenido de la solicitud',
    required: true,
    schema: { default: 'application/json' },
  })
  @ApiBody({
    schema: {
      properties: {
        file: {
          type: 'object',
          properties: {
            mime: { type: 'string' },
            base64: { type: 'string' },
          },
        },
      },
    },
  })

  @Post('upload')
  async uploadFile(@Body() body: { file: { mime: string, base64: string } }) {
    const fileData = body.file;

    // Generar un nombre de archivo único utilizando UUID y mantener la extensión original
    const filename = `${uuidv4()}.${fileData.mime.split('/')[1]}`;

    // Obtener la extensión del archivo
    const fileExtension = filename.split('.').pop();

    // Llamar al método del servicio para guardar el archivo
    const savedFile = await this.filesService.saveFile(filename, fileExtension, fileData.base64);

    return { message: 'Archivo guardado correctamente', file: savedFile };
  }
}
