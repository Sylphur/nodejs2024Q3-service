import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateAlbumDto } from 'src/shared/interfaces/dto.interface';

export class PostAlbumValidator implements CreateAlbumDto {
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  @IsOptional()
  @IsString()
  artistId: string | null;
}
