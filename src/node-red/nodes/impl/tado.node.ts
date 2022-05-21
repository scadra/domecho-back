import { Injectable } from '@nestjs/common';
import { ConfigType } from 'src/node-red/enums/config.enum';
import { ConfigFlux } from 'src/flux/models/config-flux.type';
import { Credentials } from 'src/shared/models/credential.type';
import { Provider } from '../provider.interface';
import { v4 as uuidv4 } from 'uuid';
import { AbstractNode } from '../Node.abstract';
import { GlobalNode } from 'src/node-red/models/nodes.type';

@Injectable()
export class TadoNode extends AbstractNode implements Provider {
  config = {
    id: uuidv4(),
    type: ConfigType.TADO,
    name: 'tado-home',
    password: '',
    username: '',
  };

  getConfig(): Omit<ConfigFlux, 'credential'> & Credentials {
    return this.config;
  }

  getNode(): GlobalNode {
    return this.node;
  }

  setPassword(password: string) {
    this.config.password = password;
  }

  setUsername(username: string) {
    this.config.username = username;
  }

  buildFlow(): GlobalNode[] {
    return [] as GlobalNode[];
  }
}
