import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { FilesController } from './controllers/uploads/FilesController';
import { FilesService } from './services/uploads/files.services';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './schemas/files.schema';
import { FileDataSchema } from './models/filedata.model';
import { FileRequest } from './services/file-request/file-request.service';
import { FilesReqController } from './controllers/file-request/file-request.controller';
import { FileUpdateService } from './services/file-update/file-update.service';
import { FileUpdateController } from './controllers/file-update/file-update.controller';
import { FileDeleteController } from './controllers/file-delete/file-delete.controller';
import { FileDeleteService } from './services/file-delete/file-delete.service';
import { ConfigModule } from '@nestjs/config';
import './dotenv.config';
import { FileUpdateNoCatController } from './controllers/update-no-category/update-no-category.controller';
import { FileUpdateNoCatService } from './services/update-no-category/update-no-category.service';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([{ name: 'File', schema: FileSchema }]),
    MongooseModule.forFeature([{ name: 'FileData', schema: FileDataSchema }]),
    ConfigModule.forRoot()
 
  ],
  controllers: [FilesController,FilesReqController,FileUpdateController,FileDeleteController,FileUpdateNoCatController],
  providers: [AppService,FilesService,FileRequest,FileUpdateService,FileDeleteService,FileUpdateNoCatService]
})
export class AppModule {}
