import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from 'src/devices/schemas/device.schema';
import { Flux, FluxDocument } from 'src/flux/schemas/flux.schema';
import { Node, NodeDocument } from 'src/flux/schemas/node.schema';
import { Room, RoomDocument } from 'src/rooms/schema/room.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { MongoGenericRepository } from '../../repository/mongo-generic.repository';
import { IDataServices } from '../data-service/data.service';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  users: MongoGenericRepository<User>;
  devices: MongoGenericRepository<Device>;
  rooms: MongoGenericRepository<Room>;
  nodes: MongoGenericRepository<Node>;
  flux: MongoGenericRepository<Flux>;

  constructor(
    @InjectModel(User.name)
    private UserRepository: Model<UserDocument>,
    @InjectModel(Device.name)
    private DeviceRepository: Model<DeviceDocument>,
    @InjectModel(Room.name)
    private RoomRepository: Model<RoomDocument>,
    @InjectModel(Flux.name)
    private FluxRepository: Model<FluxDocument>,
    @InjectModel(Node.name)
    private NodeRepository: Model<NodeDocument>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<User>(this.UserRepository);
    this.devices = new MongoGenericRepository<Device>(this.DeviceRepository);
    this.rooms = new MongoGenericRepository<Room>(this.RoomRepository);
    this.nodes = new MongoGenericRepository<Node>(this.NodeRepository);
    this.flux = new MongoGenericRepository<Flux>(this.FluxRepository);
  }
}
