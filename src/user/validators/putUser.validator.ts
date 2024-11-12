import { IsString } from 'class-validator';
import { UpdatePasswordDto } from 'src/shared/interfaces/dto.interface';

export class PutUserValidator implements UpdatePasswordDto {
  @IsString()
  oldPassword: string;
  @IsString()
  newPassword: string;
}
