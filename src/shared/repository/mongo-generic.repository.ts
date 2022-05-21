import { IGenericRepository } from './generic.repository';
import { Model, FilterQuery } from 'mongoose';

export class MongoGenericRepository<T>
  implements IGenericRepository<T, FilterQuery<T>>
{
  constructor(private readonly model: Model<T>) {}

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    return await this.model.findOne(filterQuery);
  }

  async find(filterQuery: FilterQuery<T>): Promise<T[]> {
    return await this.model.find(filterQuery);
  }

  async create(item: T): Promise<T> {
    return await this.model.create(item);
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<T>,
    device: Partial<T>,
  ): Promise<T> {
    return await this.model.findOneAndUpdate(userFilterQuery, device);
  }
}
