import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum FileCategory {
  Image = 'image',
  Document = 'document',
  Other = 'other',
}

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

  @Prop({ default: 'active' }) // Establece 'active' como valor por defecto
  status: string;

  @Prop({ required: true, enum: FileCategory }) // Asegúrate de tener el enum FileCategory
  category: FileCategory;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type FileDocument = File & Document;
export const FileSchema = SchemaFactory.createForClass(File);
