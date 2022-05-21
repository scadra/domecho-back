import { Injectable } from '@nestjs/common';
import { FlowEnum } from 'src/node-red/enums/flow.enum';
import { Flow } from 'src/node-red/models/flow.interface';
import { IDataServices } from 'src/shared/service/data-service/data.service';
import { Flux } from './schemas/flux.schema';

@Injectable()
export class FluxService {
  constructor(private readonly dataService: IDataServices) {}

  async saveFlux(data: Flow[]): Promise<Flux[]> {
    return Promise.all(
      this.getFlowsTargeted(data).map(async (flux) =>
        this.dataService.flux.create(this.mapFlowToFlux(flux)),
      ),
    );
  }

  getFlowsTargeted(data: Flow[]): Flow[] {
    return data.filter(
      (item: Flow) =>
        item.label.toUpperCase() === FlowEnum.Automatisation.toUpperCase() ||
        item.label.toUpperCase() === FlowEnum.Rest.toUpperCase() ||
        item.label.toUpperCase() === FlowEnum.Test.toUpperCase(),
    );
  }

  mapFlowToFlux(flow: Flow): Flux {
    return {
      fluxId: flow.id,
      label: flow.label,
      disabled: flow.disabled,
      info: flow.info,
      nodes: flow.nodes,
      configs: flow.configs,
    };
  }
}
