import { Controller, Post, Body } from '@nestjs/common';
import { FilesService } from 'src/services/uploads/files.services';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  uploadFile(@Body() body: { file: string }) {
    const base64Data = body.file;

    // Obtener el tipo de contenido del archivo desde la cadena Base64
    const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (matches.length !== 3) {
      throw new Error('Cadena Base64 no válida');
    }

    const contentType = matches[1];
    const fileData = matches[2];
    const fileBuffer = Buffer.from(fileData, 'base64');


    // Llamar al servicio para guardar el archivo
    this.filesService.saveFile(fileBuffer);

    return { message: 'Archivo guardado correctamente' };
  }
}