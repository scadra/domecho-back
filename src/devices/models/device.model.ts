import { SensorDto } from './sensor.model';
import { StateDto } from './state.model';
import { Mixin } from 'ts-mixer';
import { Room } from 'src/rooms/schema/room.schema';
import { DetectorDto } from './detector.model';

export class DeviceDto extends Mixin(StateDto, SensorDto, DetectorDto) {
  friendly_name: string;
  name: string;
  battery: number;
  room?: Room;
}
