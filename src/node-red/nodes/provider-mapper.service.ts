import { BadRequestException, Injectable } from '@nestjs/common';
import { NewProvider } from 'src/devices/models/new-provider.interface';
import { ConfigFlux } from 'src/flux/models/config-flux.type';
import { ProviderEnum } from '../enums/providers.enum';
import { BaseNode, GlobalNode } from '../models/nodes.type';
import { TadoNode } from './impl/tado.node';

@Injectable()
export class NodeMapper {
  constructor(private tadoNode: TadoNode) {}

  getConfigNode(newProvider: NewProvider): ConfigFlux {
    switch (newProvider.provider) {
      case ProviderEnum.Tado:
        const config = this.tadoNode.getConfig();
        config.username = newProvider.username;
        config.password = newProvider.password;
        return config;
      default:
        this.missingProvider();
    }
  }

  getNodes(newProvider: NewProvider): GlobalNode[] {
    switch (newProvider.provider) {
      case ProviderEnum.Tado:
        return this.tadoNode.buildFlow();
      default:
        this.missingProvider();
    }
  }

  private missingProvider(): void {
    throw new BadRequestException('Missing type of provider');
  }
}
