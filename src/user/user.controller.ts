import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUsers() {
    const takenUsers = this.userService.getAllUsers();
    const filteredUsers = takenUsers.map((user) => {
      return this.userService.getUserWithoutPwd(user);
    });
    return filteredUsers;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    const takenUser = this.userService.getUser(id);
    if (!takenUser) throw new NotFoundException('User is not found');
    return this.userService.getUserWithoutPwd(takenUser);
  }
}
