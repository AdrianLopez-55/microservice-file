import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'files' })
export class FileData {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  originalname: string;

  @Prop({ required: true })
  extension: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  filePath: number;


  @Prop({ required: true })
  createdAt: Date;


}

export type FileDataDocument = FileData & Document;
export const FileDataSchema = SchemaFactory.createForClass(FileData);
