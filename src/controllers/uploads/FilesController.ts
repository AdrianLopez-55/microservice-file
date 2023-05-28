import { Controller, Post, Body } from '@nestjs/common';
import { FilesService } from 'src/services/uploads/files.services';
import { v4 as uuidv4 } from 'uuid';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  async uploadFile(@Body() body: { file: { mime: string, data: string } }) {
    const fileData = body.file;

    // Generar un nombre de archivo único utilizando UUID y mantener la extensión original
    const filename = `${uuidv4()}.${fileData.mime.split('/')[1]}`;

    // Llamar al método del servicio para guardar el archivo
    await this.filesService.saveFile(filename, fileData);

    return { message: 'Archivo guardado correctamente' };
  }
}
