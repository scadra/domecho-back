import { Type } from '../enums/type.enum';
import { Device } from '../schemas/device.schema';
import { NameUtil } from '../utils/name.util';
import { DeviceDto } from './device.model';

export class DeviceVM extends DeviceDto {
  deviceId: string;
  type: string;
  extra: string;
  roomName: string;
  image: string;
  contact: boolean;

  constructor(deviceDto: DeviceDto, device: Device) {
    super();
    this.battery = deviceDto.battery;
    this.brightness = deviceDto.brightness;
    this.deviceId = device.name;
    this.occupancy = deviceDto.occupancy;
    this.state = deviceDto.state;
    this.state_left = deviceDto.state_left;
    this.state_middle = deviceDto.state_middle;
    this.state_right = deviceDto.state_right;
    this.contact = deviceDto.contact;

    //Mappers
    this.roomName = NameUtil.getRoom(device.friendly_name);
    this.type = NameUtil.getType(device.friendly_name);
    this.extra = NameUtil.getExtra(device.friendly_name);
    this.image = this.setImage();
  }

  setImage() {
    switch (this.type) {
      case Type.LIGHT:
        return `light-${this.state.toLowerCase()}`;
      case Type.SENSOR:
        return `sensor-${this.occupancy}`;
      case Type.SWITCH:
        return `switch-${this.getState()}`;
      case Type.ROUTER:
        return `router`;
      case Type.DETECTOR:
        return `detector-${this.contact}`;
    }
  }

  getState(): boolean {
    return (
      this.state === 'ON' ||
      this.state_left === 'ON' ||
      this.state_middle === 'ON' ||
      this.state_right === 'ON'
    );
  }
}
