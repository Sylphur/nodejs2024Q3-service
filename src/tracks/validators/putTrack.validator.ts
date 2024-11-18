import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTrackDto } from 'src/shared/interfaces/dto.interface';

export class PutTrackValidator implements CreateTrackDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  artistId: string | null;
  @IsOptional()
  @IsString()
  albumId: string | null;
  @IsOptional()
  @IsNumber()
  duration: number;
}
