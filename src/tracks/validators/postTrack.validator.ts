import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTrackDto } from 'src/shared/interfaces/dto.interface';

export class PostTrackValidator implements CreateTrackDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  artistId: string | null;
  @IsOptional()
  @IsString()
  albumId: string | null;
  @IsNumber()
  duration: number;
}
