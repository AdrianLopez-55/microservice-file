import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from 'src/schemas/files.schema';
import { readFileSync } from 'fs';
import * as mimeTypes from 'mime-types';

@Injectable()
export class FileRequest {
  constructor(
    @InjectModel(File.name) private readonly fileModel: Model<FileDocument>,
  ) {}

  async getFileById(
    id: string,
  ): Promise<{ mime: string; base64: string } | { message: string }> {
    try {
      const file = await this.fileModel.findById(id).exec();
      if (!file) {
        throw new Error('Archivo no encontrado');
      }
      if (file.status !== 'active') {
        return { message: 'El archivo ha sido eliminado' };
      }
      try {
        const fileData = readFileSync(file.filePath, { encoding: 'base64' });
        const mimeType =
          mimeTypes.lookup(file.extension) ||
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        const fileObject = {
          mime: mimeType,
          base64: fileData,
        };
        return fileObject;
      } catch (error) {
        console.error('Error al leer el archivo:', error);
        throw new InternalServerErrorException('Error al leer el archivo');
      }
    } catch (error) {
      console.error('Error al obtener el archivo:', error);
      throw new InternalServerErrorException('Error al obtener el archivo');
    }
  }
}
