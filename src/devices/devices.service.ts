//Dependencies
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
//Models
import { Device } from './schemas/device.schema';
import { DeviceDto } from './models/device.model';
import { DeviceVM } from './models/device-vm.model';
//Servcice
import { RoomsService } from 'src/rooms/rooms.service';
import { IDataServices } from 'src/shared/service/data-service/data.service';
//Util
import { NameUtil } from './utils/name.util';
import { NoderedService } from 'src/node-red/node-red.service';

@Injectable()
export class DevicesService {
  constructor(
    private readonly dataService: IDataServices,
    private noderedService: NoderedService,
    private roomService: RoomsService,
  ) {}

  async getDeviceById(deviceId: string): Promise<Device> {
    return this.dataService.devices.findOne({ deviceId });
  }

  async getDevices(): Promise<DeviceVM[]> {
    const data = await this.noderedService.getDevices();
    const devicesDb = await this.dataService.devices.find({});
    const result = await this.mapDevices(data, devicesDb);
    return result;
  }

  async updateDevice(
    deviceId: string,
    deviceUpdates: Partial<DeviceDto>,
  ): Promise<Device> {
    return this.dataService.devices.findOneAndUpdate(
      { deviceId },
      deviceUpdates,
    );
  }

  async mapDevices(
    data: DeviceDto[],
    devicesDb: Device[],
  ): Promise<DeviceVM[]> {
    const devices = [] as DeviceVM[];
    for (const item of data) {
      await new Promise(async (resolve) => {
        let devicedb = devicesDb.find((db) => db.name === item.name);
        if (!devicedb) {
          devicedb = await this.dataService.devices.create({
            friendly_name: item.friendly_name,
            name: item.name,
            deviceId: uuidv4(),
          });
        } else if (devicedb.friendly_name !== item.friendly_name) {
          devicedb = await this.updateDevice(devicedb.deviceId, {
            friendly_name: item.friendly_name,
          });
        }
        await this.adaptRoomForDevice(devicedb);
        devices.push(new DeviceVM(item, devicedb));
        resolve('end');
      });
    }
    return devices;
  }

  async adaptRoomForDevice(devicedb: Device): Promise<void> {
    const roomName = NameUtil.getRoom(devicedb.friendly_name);
    //get Room if exist
    const rooms = await this.dataService.rooms.find({});
    let room = rooms.find((item) => item.name === roomName);
    if (!room) {
      room = await this.dataService.rooms.create({
        roomId: uuidv4(),
        name: roomName,
        devices: [devicedb],
      });
    } else if (
      !room.devices.some((device) => device.deviceId === devicedb.deviceId)
    ) {
      await this.roomService.updateDeviceInRoom(devicedb, room, rooms);
    }
  }
}
