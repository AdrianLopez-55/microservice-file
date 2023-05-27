import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesController } from './controllers/uploads/FilesController';
import { FilesService } from './services/uploads/files.services';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './schemas/files.schema';
import { FileHandlerController } from './controllers/handler/file-handler.controller';
import { FilehandlerService } from './services/file-handler/file-handler.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://EricRojo:practicalaboral@cluster0.78zh6ct.mongodb.net/PracticaLaboral', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([{ name: 'File', schema: FileSchema }]),
 
  ],
  controllers: [AppController,FilesController,FileHandlerController],
  providers: [AppService,FilesService,FilehandlerService],
})
export class AppModule {}
