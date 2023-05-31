import { Injectable } from '@nestjs/common';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { File, FileDocument, FileCategory } from 'src/schemas/files.schema';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
  ) {}

  async saveFile(filename: string, fileExtension: string, fileData: string) {
    const directory = 'uploads'; // Ruta de la carpeta de destino

    // Verificar si el directorio existe, si no, crearlo
    if (!existsSync(directory)) {
      mkdirSync(directory);
    }

    // Generar un nombre de archivo único utilizando UUID
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;

    // Resto del código para guardar el archivo en el directorio
    const filePath = `${directory}/${uniqueFilename}`;
    writeFileSync(filePath, fileData, { encoding: 'base64' });

    // Determinar la categoría según la extensión del archivo
    let category: FileCategory;

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(fileExtension.toLowerCase())) {
      category = FileCategory.Image;
    } else if (['doc', 'docx', 'pdf', 'txt'].includes(fileExtension.toLowerCase())) {
      category = FileCategory.Document;
    } else {
      category = FileCategory.Other;
    }

    // Guardar los datos del archivo en la base de datos
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

    return file;
  }
}
