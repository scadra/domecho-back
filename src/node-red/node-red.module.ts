import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { FluxModule } from 'src/flux/flux.module';
import { NoderedService } from './node-red.service';
import { HttpNode } from './nodes/impl/http.node';
import { TadoNode } from './nodes/impl/tado.node';
import { NodeMapper } from './nodes/provider-mapper.service';

@Global()
@Module({
  imports: [HttpModule, FluxModule],
  providers: [NoderedService, TadoNode, NodeMapper, HttpNode],
  exports: [NoderedService],
})
export class NodeRedModule {}
