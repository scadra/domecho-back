import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Config } from './config.schema';
import { Node } from './node.schema';

export type FluxDocument = Flux & Document;

@Schema()
export class Flux {
  @Prop()
  fluxId: string;

  @Prop()
  label: string;

  @Prop()
  disabled: boolean;

  @Prop()
  info: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Node' })
  nodes: Node[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Config' })
  configs: Config[];
}

export const FluxSchema = SchemaFactory.createForClass(Flux);
