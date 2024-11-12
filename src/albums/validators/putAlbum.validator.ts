import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateAlbumDto } from 'src/shared/interfaces/dto.interface';

export class PutAlbumValidator implements CreateAlbumDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsNumber()
  year: number;
  @IsOptional()
  @IsString()
  artistId: string | null;
}
