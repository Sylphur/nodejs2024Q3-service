import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Users } from 'src/DB/database';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
} from 'src/shared/interfaces/dto.interface';
import { UserEntity } from './transformers/user.transformer';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
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

  getAllUsers() {
    const filteredUsers = Users.map((user) => {
      return this.getUserWithoutPwd(user);
    });
    return filteredUsers;
  }

  getUser(id: string) {
    const takenUser = Users.find((user) => user.id === id);
    if (!takenUser) throw new NotFoundException('User is not found');
    return this.getUserWithoutPwd(takenUser);
  }

  postUser(user: CreateUserDto) {
    const newUser: User = {
      id: v4(),
      login: user.login,
      password: user.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    Users.push(newUser);
    return this.getUserWithoutPwd(newUser);
  }

  updateUser(id: string, pwds: UpdatePasswordDto) {
    const takenUser = Users.find((user) => user.id === id);
    if (!takenUser) throw new NotFoundException('User is not found');
    if (takenUser.password !== pwds.oldPassword)
      throw new ForbiddenException('Incorrect password');
    const updatedUser: User = {
      id: takenUser.id,
      login: takenUser.login,
      password: pwds.newPassword,
      version: ++takenUser.version,
      createdAt: takenUser.createdAt,
      updatedAt: Date.now(),
    };
    const index = Users.indexOf(takenUser);
    Users.splice(index, 1);
    Users.push(updatedUser);
    return this.getUserWithoutPwd(updatedUser);
  }
}
