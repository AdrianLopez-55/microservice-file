import { Injectable, Logger } from '@nestjs/common';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { File, FileDocument, FileCategory } from 'src/schemas/files.schema';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  constructor(
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
  ) {}

  async saveFile(filename: string, fileExtension: string, fileData: string) {
    try {
      const now = new Date();
      const year = now.getFullYear().toString();
      const month = now.toLocaleString('default', { month: 'long' });
      const day = now.getDate().toString();
      const dayOfWeek = now.toLocaleString('default', { weekday: 'long' });
      const directory = `/home/dby823/FilesBackend/${year}/${month}/${day}_${dayOfWeek}`;

      // Verificar si el directorio existe, si no, crearlo
      if (!existsSync(directory)) {
        mkdirSync(directory, { recursive: true });
      }

      const uniqueFilename = `${uuidv4()}.${fileExtension}`;
      const filePath = `${directory}/${uniqueFilename}`;
      writeFileSync(filePath, fileData, { encoding: 'base64' });

      let category: FileCategory;

      if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(fileExtension.toLowerCase())) {
        category = FileCategory.Image;
      } else if (['doc', 'docx', 'pdf', 'txt'].includes(fileExtension.toLowerCase())) {
        category = FileCategory.Document;
      } else {
        category = FileCategory.Other;
      }

      const file = new this.fileModel({
        filename,
        originalname: uniqueFilename,
        extension: fileExtension.toLowerCase(),
        size: fileData.length,
        filePath,
        category,
        status: 'active',
      });

      await file.save();

      this.logger.log(`Archivo guardado correctamente en ${filePath}`);
      return file;
    } catch (error) {
      this.logger.error(`Error al guardar el archivo: ${error.message}`);
      throw new Error('No se pudo guardar el archivo');
    }
  }
}
