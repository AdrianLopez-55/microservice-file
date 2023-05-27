import { Controller, Get, Param } from '@nestjs/common';
import { FileData } from 'src/models/filedata.model';
import { FileDataService } from 'src/services/filedata/filedata.service';

@Controller('file-data')
export class FileDataController {
  constructor(private readonly fileDataService: FileDataService) {}

  @Get(':filename')
  async getFileDataByFilename(@Param('filename') filename: string): Promise<FileData> {
    return this.fileDataService.getFileDataByFilename(filename);
  }
}
