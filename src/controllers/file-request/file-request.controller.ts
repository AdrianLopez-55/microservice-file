import { Controller, Get, Param, Res } from '@nestjs/common';
import { FileRequest } from 'src/services/file-request/file-request.service';
import { Response } from 'express';

@Controller('file-req')
export class FileReqController {
  constructor(private readonly fileRequest: FileRequest) {}

  @Get(':id')
  async getFile(@Param('id') id: string, @Res() res: Response) {
    try {
      // Obtener los datos del archivo a partir de la base de datos
      const file = await this.fileRequest.getFileById(id);

      // Verificar si se encontró el archivo
      if (!file) {
        throw new Error('Archivo no encontrado');
      }

      // Obtener el contenido en base64 del archivo
      const fileBase64 = this.fileRequest.getFileBase64(file.filePath,file.extension);

      // Establecer las cabeceras de respuesta
      res.set('Content-Type', 'application/json');

      // Enviar el archivo como respuesta
      res.json({ file: fileBase64 });
    } catch (error) {
      // Manejar cualquier error y enviar una respuesta de error
      res.status(500).json({ error: error.message });
    }
  }
}
