import { Injectable, NotFoundException } from '@nestjs/common';
import { Albums, Artists, Favorites, Tracks } from 'src/DB/database';
import { PostArtistValidator } from './validators/postArtist.validator';
import { Artist } from 'src/shared/interfaces/dto.interface';
import { v4 } from 'uuid';
import { PutArtistValidator } from './validators/putArtist.validator';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
  ) {}

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

    const tracksToEdit = Tracks.filter((track) => track.artistId === id);
    tracksToEdit.forEach((track) => {
      this.tracksService.editTrack(track.id, {
        name: track.name,
        duration: track.duration,
        albumId: track.albumId,
        artistId: null,
      });
    });

    const albumsToEdit = Albums.filter((album) => album.artistId === id);
    albumsToEdit.forEach((album) => {
      this.albumsService.editAlbum(album.id, {
        name: album.name,
        year: album.year,
        artistId: null,
      });
    });

    const favsIndex = Favorites.artists.indexOf(id);
    if (favsIndex >= 0) Favorites.artists.splice(favsIndex, 1);
  }
}
