import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/shared/service/data-service/data.service';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly dataService: IDataServices) {}

  async getUserByEmail(email: string): Promise<User> {
    return this.dataService.users.findOne({ email });
  }

  async createUser(user: User): Promise<User> {
    return this.dataService.users.create(user);
  }
}
