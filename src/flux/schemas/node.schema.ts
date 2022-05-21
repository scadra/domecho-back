import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type NodeDocument = Node & Document;

@Schema()
export class Node {
  @Prop()
  _id?: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, dropDups: true })
  name: string;

  @Prop()
  type: string;

  @Prop()
  x: string;

  @Prop()
  y: string;

  @Prop()
  z: string;
}

export const NodeSchema = SchemaFactory.createForClass(Node);
