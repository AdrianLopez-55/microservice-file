import { Injectable } from '@nestjs/common';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  saveFile(fileBuffer: Buffer,) {
    const directory = 'uploads'; // Ruta de la carpeta de destino

    // Verificar si el directorio existe, si no, crearlo
    if (!existsSync(directory)) {
      mkdirSync(directory);
    }

    // Generar un nombre de archivo único utilizando UUID
    const filename = `${uuidv4()}.jpg`;

    // Resto del código para guardar el archivo en el directorio
    const filePath = `${directory}/${filename}`;
    writeFileSync(filePath, fileBuffer);

    console.log(`Archivo "${filename}" guardado correctamente en "${filePath}"`);

    // Puedes realizar otras operaciones o retornar alguna respuesta aquí si es necesario
  }
}
