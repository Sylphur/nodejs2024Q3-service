import { Injectable, NotFoundException } from '@nestjs/common';
import { Artists } from 'src/DB/database';
import { PostArtistValidator } from './validators/postArtist.validator';
import { Artist } from 'src/shared/interfaces/dto.interface';
import { v4 } from 'uuid';
import { PutArtistValidator } from './validators/putArtist.validator';

@Injectable()
export class ArtistsService {
  getAllArtists() {
    return Artists;
  }

  getArtistById(id: string) {
    const takenArtist = Artists.find((artist) => artist.id === id);
    if (!takenArtist) throw new NotFoundException('Artist is not found');
    return takenArtist;
  }

  postNewArtist(dto: PostArtistValidator) {
    const newArtist: Artist = {
      id: v4(),
      name: dto.name,
      grammy: dto.grammy,
    };
    Artists.push(newArtist);
    return newArtist;
  }

  editArtist(id: string, dto: PutArtistValidator) {
    const takenArtist = Artists.find((artist) => artist.id === id);
    if (!takenArtist) throw new NotFoundException('Artist is not found');
    const updatedArtist: Artist = {
      id: takenArtist.id,
      name: dto.name ? dto.name : takenArtist.name,
      grammy:
        dto.grammy || dto.grammy === false ? dto.grammy : takenArtist.grammy,
    };
    const index = Artists.indexOf(takenArtist);
    Artists.splice(index, 1);
    Artists.push(updatedArtist);
    return updatedArtist;
  }

  deleteArtist(id: string) {
    const takenArtist = Artists.find((artist) => artist.id === id);
    if (!takenArtist) throw new NotFoundException('Artist is not found');
    const index = Artists.indexOf(takenArtist);
    Artists.splice(index, 1);
  }
}
