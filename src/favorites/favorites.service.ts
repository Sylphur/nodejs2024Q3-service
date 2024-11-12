import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { Favorites } from 'src/DB/database';
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
}
