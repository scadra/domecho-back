import { Config } from 'src/flux/schemas/config.schema';
import { GlobalNode } from './nodes.type';

export interface Flow {
  id: string;
  type: string;
  label: string;
  disabled: boolean;
  info: string;
  env: string[];
  nodes: GlobalNode[];
  configs: Config[];
}
