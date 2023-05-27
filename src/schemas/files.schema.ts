import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class File {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  originalname: string;

  @Prop({ required: true })
  extension: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  filePath: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type FileDocument = File & Document;
export const FileSchema = SchemaFactory.createForClass(File);
