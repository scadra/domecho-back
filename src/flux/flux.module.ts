import { Module } from '@nestjs/common';
import { FluxService } from './flux.service';
import { NodesService } from './nodes.service';

@Module({
  providers: [FluxService, NodesService],
  exports: [FluxService, NodesService],
})
export class FluxModule {}
