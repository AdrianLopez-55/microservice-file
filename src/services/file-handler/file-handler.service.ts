import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class FilehandlerService {
  getFileBase64(filename: string): string {
    try {
      const filePath = `uploads/${filename}`;
      const fileData = readFileSync(filePath, { encoding: 'base64' });
      return fileData;
    } catch (error) {
      throw new Error(`Error al leer el archivo: ${error.message}`);
    }
  }
}
