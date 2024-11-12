import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
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
    return this.userService.getAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUser(id);
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/:id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }
}
