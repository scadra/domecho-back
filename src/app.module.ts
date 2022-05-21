/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
//Module
import { RoomsModule } from './rooms/rooms.module';
import { DevicesModule } from './devices/devices.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DataServicesModule } from './shared/service/data-service/data-service.module';
//Service
import { AppService } from './app.service';
//Controller
import { AppController } from './app.controller';
import { NodeRedModule } from './node-red/node-red.module';
import { FluxService } from './flux/flux.service';
import { NodesService } from './flux/nodes.service';
import { FluxModule } from './flux/flux.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://domecho-adm:%40Mmjk4Y8Yj8N@localhost:27018/domecho?authSource=admin',
      {
        connectionFactory: (connection) => {
          connection.plugin(require('mongoose-autopopulate'));
          return connection;
        },
      },
    ),
    DevicesModule,
    AuthModule,
    UsersModule,
    RoomsModule,
    DataServicesModule,
    NodeRedModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FluxModule,
  ],
  controllers: [AppController],
  providers: [AppService, FluxService, NodesService],
})
export class AppModule {}
