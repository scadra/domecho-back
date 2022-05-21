import { Body, Controller, Get, Post } from '@nestjs/common';
import { NewFlux } from 'src/flux/models/New-Flux.type';
import { FlowEnum } from 'src/node-red/enums/flow.enum';
import { NoderedService } from 'src/node-red/node-red.service';
import { DevicesService } from './devices.service';
import { DeviceVM } from './models/device-vm.model';
import { NewProvider } from './models/new-provider.interface';
import Tado = require('./tado.device.js');

@Controller('devices')
export class DevicesController {
  constructor(
    private readonly devicesService: DevicesService,
    private noderedService: NoderedService,
  ) {}

  @Get()
  async getDevices(): Promise<DeviceVM[]> {
    return this.devicesService.getDevices();
  }

  @Post('/add-provider')
  async addProvider(@Body() body: NewProvider): Promise<DeviceVM[]> {
    const token = await this.noderedService.getToken();
    const flows = await this.noderedService.getFlowsAndSave(token);
    const restFlow = flows.find(
      (flow) => flow.label.toUpperCase() === FlowEnum.Test.toUpperCase(),
    );
    await this.noderedService.saveConfigToFlux(
      token,
      new NewFlux(restFlow),
      body,
    );
    return [];
  }
}
