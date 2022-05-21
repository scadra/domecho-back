import { BadGatewayException, Injectable } from '@nestjs/common';
import { HttpType } from 'src/node-red/enums/http.enum';
import {
  GlobalNode,
  HttpInNode,
  HttpResponseNode,
} from 'src/node-red/models/nodes.type';
import { AbstractNode } from '../Node.abstract';

@Injectable()
export class HttpNode extends AbstractNode {
  node: HttpInNode | HttpResponseNode;

  buildFlow(): GlobalNode[] {
    throw new BadGatewayException('not yet implemented');
  }

  buildIn(name: string, url: string, method: string): void {
    this.node = this.node as HttpInNode;
    this.setType(HttpType.In);
    this.setName(name);
    this.node.method = method;
    this.node.url = url;
  }

  buildResponse(name: string): void {
    this.setType(HttpType.Response);
    this.setName(name);
  }
}
