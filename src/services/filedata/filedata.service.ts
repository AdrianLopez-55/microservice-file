import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileData,FileDataDocument } from 'src/models/filedata.model';

@Injectable()
export class FileDataService {
  constructor(
    @InjectModel(FileData.name) private readonly fileDataModel: Model<FileDataDocument>,
  ) {}

  async getFileDataByFilename(filename: string): Promise<FileData> {
    return this.fileDataModel.findOne({ filename }).lean().exec();
  }
  
}
