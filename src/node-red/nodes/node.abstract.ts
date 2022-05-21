import { GlobalNode } from '../models/nodes.type';

export abstract class AbstractNode {
  node = {
    wires: [],
  } as GlobalNode;

  abstract buildFlow(): void;

  setWires(wires: Array<Array<string>>): void {
    this.node.wires = wires;
  }

  setPositions(x: string, y: string): void {
    this.node.x = x;
    this.node.y = y;
  }

  setType(type: string) {
    this.node.type = type;
  }

  setName(name: string) {
    this.node.name = name;
  }

  setConfig(configName: string) {
    this.node.configName = configName;
  }

  setFluxId(z: string) {
    this.node.z = z;
  }

  setId(id: string) {
    this.node.id = id;
  }
}
