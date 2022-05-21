import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type ConfigDocument = Config & Document;

@Schema()
export class Config {
  @Prop()
  _id?: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, dropDups: true })
  name: string;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);
