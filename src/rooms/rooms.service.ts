import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { Device } from 'src/devices/schemas/device.schema';
import { IDataServices } from 'src/shared/service/data-service/data.service';
import { Room } from './schema/room.schema';

@Injectable()
export class RoomsService {
  constructor(private readonly dataService: IDataServices) {}

  async getRoomByDevice(deviceId: string, roomsProvided?: Room[]) {
    const rooms = roomsProvided
      ? roomsProvided
      : await this.dataService.rooms.find();

    const room = rooms.find((item) =>
      item.devices.some((device) => device.deviceId === deviceId),
    );

    return room;
  }

  async updateDeviceInRoom(devicedb: Device, room: Room, rooms: Room[]) {
    const previousRoom = await this.getRoomByDevice(devicedb.deviceId, rooms);
    let devices = room.devices;
    devices.push(devicedb);
    await this.dataService.rooms.findOneAndUpdate(
      {
        roomId: room.roomId,
      },
      {
        devices,
      },
    );
    if (previousRoom) {
      devices = (previousRoom.devices as Device[]).filter(
        (device: Device) => device.deviceId !== devicedb.deviceId,
      ) as Device[];
      await this.dataService.rooms.findOneAndUpdate(
        {
          roomId: previousRoom.roomId,
        },
        {
          devices,
        },
      );
    }
  }
}
