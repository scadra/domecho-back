import { Device } from 'src/devices/schemas/device.schema';
import { Flux } from 'src/flux/schemas/flux.schema';
import { Node } from 'src/flux/schemas/node.schema';
import { Room } from 'src/rooms/schema/room.schema';
import { User } from 'src/users/schemas/user.schema';
import { IGenericRepository } from '../../repository/generic.repository';

export abstract class IDataServices {
  abstract users: IGenericRepository<User, unknown>;
  abstract rooms: IGenericRepository<Room, unknown>;
  abstract devices: IGenericRepository<Device, unknown>;
  abstract flux: IGenericRepository<Flux, unknown>;
  abstract nodes: IGenericRepository<Node, unknown>;
}
