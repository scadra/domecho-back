import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Room } from 'src/rooms/schema/room.schema';

export type DeviceDocument = Device & Document;

@Schema()
export class Device {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, dropDups: true })
  deviceId: string;

  @Prop({ required: true, dropDups: true })
  name: string;

  @Prop()
  friendly_name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
  room: Room;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
