import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesController } from './controllers/uploads/FilesController';
import { FilesService } from './services/uploads/files.services';

@Module({
  imports: [],
  controllers: [AppController,FilesController],
  providers: [AppService,FilesService],
})
export class AppModule {}
