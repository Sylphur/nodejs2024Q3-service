import { Injectable } from '@nestjs/common';
import { Users } from 'src/DB/database';
import { User } from 'src/shared/interfaces/dto.interface';
import { UserEntity } from './transformers/user.transformer';

@Injectable()
export class UserService {
  getAllUsers() {
    return Users;
  }
  getUser(id: string) {
    return Users.find((user) => user.id === id);
  }
  getUserWithoutPwd(user: User) {
    return new UserEntity({
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      password: user.password,
    });
  }
}
