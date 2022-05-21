import { Global, Module } from '@nestjs/common';
import { MongoDataServicesModule } from '../mongo-data/mongo-data.module';

@Global()
@Module({
  imports: [MongoDataServicesModule],
  exports: [MongoDataServicesModule],
})
export class DataServicesModule {}
