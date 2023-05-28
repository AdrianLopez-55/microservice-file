import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesController } from './controllers/uploads/FilesController';
import { FilesService } from './services/uploads/files.services';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './schemas/files.schema';
import { FileHandlerController } from './controllers/handler/file-handler.controller';
import { FilehandlerService } from './services/file-handler/file-handler.service';
import { FileDataSchema } from './models/filedata.model';
import { FileDataController } from './controllers/filedata/filedata.controller';
import { FileDataService } from './services/filedata/filedata.service';
import { FileRequest } from './services/file-request/file-request.service';
import { FilesReqController } from './controllers/file-request/file-request.controller';
import { FileUpdateService } from './services/file-update/file-update.service';
import { FileUpdateController } from './controllers/file-update/file-update.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://EricRojo:practicalaboral@cluster0.78zh6ct.mongodb.net/PracticaLaboral', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([{ name: 'File', schema: FileSchema }]),
    MongooseModule.forFeature([{ name: 'FileData', schema: FileDataSchema }]),
 
  ],
  controllers: [AppController,FilesController,FileHandlerController,
    FileDataController,FilesReqController,FileUpdateController],
  providers: [AppService,FilesService,FilehandlerService,FileDataService,FileRequest,FileUpdateService]
})
export class AppModule {}
