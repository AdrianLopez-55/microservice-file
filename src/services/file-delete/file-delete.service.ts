import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { File, FileDocument } from 'src/schemas/files.schema';

@Injectable()
export class FileDeleteService {
  constructor(
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
  ) {}

  async deleteFile(fileId: string) {
    try {
      const updatedFile = await this.fileModel.findByIdAndUpdate(
        fileId,
        { status: 'inactive' },
        { new: true },
      );

      if (!updatedFile) {
        throw new Error('No se encontró el archivo');
      }

      return 'Archivo eliminado correctamente';
    } catch (error) {
      throw new Error('Error al eliminar el archivo');
    }
  }
}
