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
      const deletedFile = await this.fileModel.findByIdAndDelete(fileId);
      if (!deletedFile) {
        throw new Error('No se encontró el archivo');
      }
    } catch (error) {
      throw new Error('Error al eliminar el archivo');
    }
  }
}
