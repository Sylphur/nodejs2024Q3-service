import { IsString } from 'class-validator';
import { CreateUserDto } from 'src/shared/interfaces/dto.interface';

export class PostUserValidator implements CreateUserDto {
  @IsString()
  login: string;
  @IsString()
  password: string;
}
