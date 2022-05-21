import { GlobalNode } from 'src/node-red/models/nodes.type';
import { Flux } from '../schemas/flux.schema';
import { ConfigFlux } from './config-flux.type';

export class NewFlux {
  fluxId: string;
  label: string;
  disabled: boolean;
  info: string;
  nodes: GlobalNode[];
  configs: ConfigFlux[];

  constructor(flux: Flux) {
    this.fluxId = flux.fluxId;
    this.label = flux.label;
    this.disabled = flux.disabled;
    this.info = flux.info;
    this.nodes = Object.assign([], flux.nodes) as GlobalNode[];
    this.configs = Object.assign([], flux.configs) as ConfigFlux[];
  }
}
