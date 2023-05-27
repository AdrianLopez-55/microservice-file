import { Controller, Post, Body } from '@nestjs/common';
import { FilesService } from 'src/services/uploads/files.services';
import { v4 as uuidv4 } from 'uuid';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  async uploadFile(@Body() body: { file: string }) {
    const base64Data = body.file;

    // Obtener el tipo de contenido y los datos del archivo desde la cadena Base64
    const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (matches.length !== 3) {
      throw new Error('Cadena Base64 no válida');
    }

    const contentType = matches[1];
    const fileData = matches[2];
    const fileBuffer = Buffer.from(fileData, 'base64');

    // Generar un nombre de archivo único utilizando UUID y mantener la extensión original
    const filename = `${uuidv4()}.${contentType.split('/')[1]}`;

    // Llamar al método del servicio para guardar el archivo
    const savedFile = await this.filesService.saveFile(filename, fileBuffer);

    return { message: 'Archivo guardado correctamente', savedFile };
  }
}
