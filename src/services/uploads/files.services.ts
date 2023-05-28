import { Injectable } from '@nestjs/common';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { File, FileDocument } from 'src/schemas/files.schema';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
  ) {}

  async saveFile(filename: string, fileData: { mime: string, data: string }) {
    const directory = 'uploads';

    if (!existsSync(directory)) {
      mkdirSync(directory);
    }

    const fileExtension = fileData.mime.split('/')[1];
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    const filePath = `${directory}/${uniqueFilename}`;
    const fileBuffer = Buffer.from(fileData.data, 'base64');

    writeFileSync(filePath, fileBuffer);

    console.log(`Archivo "${uniqueFilename}" guardado correctamente en "${filePath}"`);

    const file = new this.fileModel({
      filename,
      originalname: uniqueFilename,
      extension: fileExtension,
      size: fileBuffer.length,
      filePath,
    });

    await file.save();

    console.log('Datos del archivo guardados en la base de datos:', file);
  }
}
