import { Injectable } from '@nestjs/common';
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

  async getFileById(id: string): Promise<File> {
    return this.fileModel.findById(id).exec();
  }

  getFileData(filePath: string, extension: string): { mime: string, data: string } {
    try {
      const fileData = readFileSync(filePath, { encoding: 'base64' });
      const mimeType = mimeTypes.lookup(extension) || 'application/octet-stream';
      const file = {
        mime: `@file/${extension}`,
        data: `data:${mimeType};base64,${fileData}`
      };
      return file;
    } catch (error) {
      throw new Error(`Error al leer el archivo: ${error.message}`);
    }
  }
}
