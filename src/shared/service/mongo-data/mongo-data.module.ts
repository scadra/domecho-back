import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from 'src/devices/schemas/device.schema';
import { Flux, FluxSchema } from 'src/flux/schemas/flux.schema';
import { Node, NodeSchema } from 'src/flux/schemas/node.schema';
import { Room, RoomSchema } from 'src/rooms/schema/room.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { IDataServices } from '../data-service/data.service';
import { MongoDataServices } from './mongo-data.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Device.name, schema: DeviceSchema },
      { name: Room.name, schema: RoomSchema },
      { name: Flux.name, schema: FluxSchema },
      { name: Node.name, schema: NodeSchema },
    ]),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
