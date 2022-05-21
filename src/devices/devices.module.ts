import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RoomsModule } from 'src/rooms/rooms.module';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';

@Module({
  imports: [HttpModule, RoomsModule],
  providers: [DevicesService],
  controllers: [DevicesController],
})
export class DevicesModule {}
