import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Device } from 'src/devices/schemas/device.schema';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ required: true, dropDups: true })
  roomId: string;

  @Prop({ required: true, dropDups: true })
  name: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
        autopopulate: true,
      },
    ],
  })
  devices: Device[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
