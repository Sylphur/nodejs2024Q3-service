import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateArtistDto } from 'src/shared/interfaces/dto.interface';

export class PutArtistValidator implements CreateArtistDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
