import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { Favorites, Tracks } from 'src/DB/database';
import { FavoritesResponse } from 'src/shared/interfaces/dto.interface';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}
  getAllFavorites() {
    const favoritesResponse: FavoritesResponse = {
      artists: Favorites.artists.map((artistID) => {
        return this.artistsService.getArtistById(artistID);
      }),
      albums: Favorites.albums.map((albumID) => {
        return this.albumsService.getAlbumById(albumID);
      }),
      tracks: Favorites.tracks.map((trackID) => {
        return this.tracksService.getTrackById(trackID);
      }),
    };
    return favoritesResponse;
  }

  postNewFavoriteTrack(id: string) {
    const takenTrack = Tracks.find((track) => track.id === id);
    if (!takenTrack)
      throw new UnprocessableEntityException('Track with this ID is not found');
    Favorites.tracks.push(id);
    return takenTrack;
  }

  deleteFavoriteTrack(id: string) {
    const takenTrackEntity = Favorites.tracks.find((entity) => entity === id);
    if (!takenTrackEntity)
      throw new NotFoundException(
        'Track with this ID is not found in favorites',
      );
    const index = Favorites.tracks.indexOf(takenTrackEntity);
    Favorites.tracks.splice(index, 1);
  }
}
