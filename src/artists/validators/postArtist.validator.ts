import { IsBoolean, IsString } from 'class-validator';
import { CreateArtistDto } from 'src/shared/interfaces/dto.interface';

export class PostArtistValidator implements CreateArtistDto {
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}
