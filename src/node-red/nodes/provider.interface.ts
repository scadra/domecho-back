import { ConfigFlux } from 'src/flux/models/config-flux.type';
import { GlobalNode } from '../models/nodes.type';

export interface Provider {
  getConfig(): ConfigFlux;
  getNode(): GlobalNode;
}
