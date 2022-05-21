import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { DeviceDto } from 'src/devices/models/device.model';
import { NewProvider } from 'src/devices/models/new-provider.interface';
import { FluxService } from 'src/flux/flux.service';
import { ConfigFlux } from 'src/flux/models/config-flux.type';
import { NewFlux } from 'src/flux/models/New-Flux.type';
import { Config } from 'src/flux/schemas/config.schema';
import { Flux } from 'src/flux/schemas/flux.schema';
import { Auth } from 'src/node-red/models/auth.interface';
import { Flow } from 'src/node-red/models/flow.interface';
import { Token } from 'src/node-red/models/token.interface';
import { IDataServices } from 'src/shared/service/data-service/data.service';
import { NodeMapper } from './nodes/provider-mapper.service';

@Injectable()
export class NoderedService {
  constructor(
    private httpService: HttpService,
    private readonly dataService: IDataServices,
    private readonly fluxService: FluxService,
    private readonly nodeMapper: NodeMapper,
  ) {}

  async getFlows(token: Token): Promise<Flow[]> {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${process.env.NODE_RED_URL}/flows`,
        this.getHeader(token),
      ),
    );
    return data;
  }

  async getFlowsAndSave(token: Token): Promise<Flux[]> {
    let flows = [] as Flow[];
    let data = await this.dataService.flux.find();
    if (data.length === 0) {
      flows = await this.getFlows(token);
      data = await this.fluxService.saveFlux(
        flows.filter((flow) => flow.label !== undefined),
      );
    }
    return data;
  }

  async saveConfigToFlux(
    token: Token,
    flux: NewFlux,
    newProvider: NewProvider,
  ): Promise<Flow> {
    const config = this.nodeMapper.getConfigNode(newProvider);
    if (!flux.configs) {
      flux.configs = [];
    }
    flux.configs.push(config);
    return this.updateFlow(token, flux);
  }

  async saveNodeToFlux(
    token: Token,
    flux: NewFlux,
    newProvider: NewProvider,
  ): Promise<Flow> {
    const nodes = this.nodeMapper.getNodes(newProvider);
    if (!flux.nodes) {
      flux.nodes = [];
    }
    flux.nodes.concat(nodes);
    return this.updateFlow(token, flux);
  }

  async updateFlow(token: Token, flux: NewFlux): Promise<Flow> {
    console.log(flux);
    const { data } = await firstValueFrom(
      this.httpService.put(
        `${process.env.NODE_RED_URL}/flow/${flux.fluxId}`,
        flux,
        this.getHeader(token),
      ),
    );
    return data;
  }

  async getDevices(): Promise<DeviceDto[]> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${process.env.NODE_RED_URL}/devices`),
    );
    return data;
  }

  async getToken(): Promise<Token> {
    const { data } = await firstValueFrom(
      this.httpService.post(
        `${process.env.NODE_RED_URL}/auth/token`,
        new Auth(),
      ),
    );
    return data;
  }

  getHeader(token: Token): unknown {
    return {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    };
  }
}
