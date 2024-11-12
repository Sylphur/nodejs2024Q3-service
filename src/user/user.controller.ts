import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PostUserValidator } from './validators/postUser.validator';
import { PutUserValidator } from './validators/putUser.validator';

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

  @UsePipes(new ValidationPipe())
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  postNewUser(@Body() dto: PostUserValidator) {
    return this.userService.postUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/:id')
  putUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: PutUserValidator,
  ) {
    return this.userService.updateUser(id, dto);
  }
}
