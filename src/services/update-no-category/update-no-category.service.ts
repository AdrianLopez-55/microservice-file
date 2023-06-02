import { Injectable } from '@nestjs/common';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { File, FileDocument, FileCategory } from 'src/schemas/files.schema';

@Injectable()
export class FileUpdateNoCatService {
  constructor(
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
  ) {}

  async updateFile(fileId: string, fileData: { mime: string, base64: string }): Promise<File> {
    // Obtener el tipo de contenido y los datos del archivo desde el objeto fileData
    const contentType = fileData.mime;
    const fileBuffer = Buffer.from(fileData.base64, 'base64');

    // Obtener la extensión del archivo original
    const fileExtension = contentType.split('/')[1];

    // Generar un nombre de archivo único utilizando UUID y mantener la extensión original
    const filename = `${uuidv4()}.${fileExtension}`;

    const now = new Date();
    const year = now.getFullYear().toString();
    const month = now.toLocaleString('default', { month: 'long' });
    const day = now.getDate().toString();
    const dayOfWeek = now.toLocaleString('default', { weekday: 'long' });
    const directory = `/home/dby823/FilesBackend/${year}/${month}/${day}_${dayOfWeek}`; // Ruta de la carpeta de destino

    // Verificar si el directorio existe, si no, crearlo
    if (!existsSync(directory)) {
      mkdirSync(directory, { recursive: true });
    }

    // Ruta del archivo actualizado
    const newFilePath = `${directory}/${filename}`;

    // Guardar el archivo actualizado en el sistema de archivos
    writeFileSync(newFilePath, fileBuffer);

    // Obtener el archivo existente de la base de datos
    const existingFile = await this.fileModel.findById(fileId);

    if (!existingFile) {
      throw new Error('El archivo no existe en la base de datos');
    }

    // Actualizar los campos en la base de datos
    const updatedFile = await this.fileModel.findByIdAndUpdate(
      fileId,
      { filename, filePath: newFilePath,extension: fileExtension  },
      { new: true }
    );

    return updatedFile;
  }
}
