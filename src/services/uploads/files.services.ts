import { Injectable } from '@nestjs/common';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { File,FileDocument } from 'src/schemas/files.schema';


@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
  ) {}

  async saveFile(filename: string,  fileBuffer: Buffer) {
    const directory = 'uploads'; // Ruta de la carpeta de destino

    // Verificar si el directorio existe, si no, crearlo
    if (!existsSync(directory)) {
      mkdirSync(directory);
    }
    
    // Obtener la extensión del archivo original
    const fileExtension = filename.split('.').pop();


    // Generar un nombre de archivo único utilizando UUID
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;

    // Resto del código para guardar el archivo en el directorio
    const filePath = `${directory}/${uniqueFilename}`;
    writeFileSync(filePath, fileBuffer);

    console.log(`Archivo "${uniqueFilename}" guardado correctamente en "${filePath}"`);

    // Puedes realizar otras operaciones o retornar alguna respuesta aquí si es necesario
      // Guardar los datos del archivo en la base de datos
      const file = new this.fileModel({
        filename,
        originalname:uniqueFilename,
        extension: fileExtension,
        size: fileBuffer.length,
        filePath,
      });
  
      await file.save();
  
      console.log('Datos del archivo guardados en la base de datos:', file);
  
  }
}
