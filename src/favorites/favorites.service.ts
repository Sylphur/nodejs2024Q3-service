import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { Albums, Artists, Favorites, Tracks } from 'src/DB/database';
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
    const takenTracks = Favorites.tracks.map((trackID) => {
      return Tracks.find((track) => track.id === trackID);
    });
    const takenAlbums = Favorites.albums.map((albumID) => {
      return Albums.find((album) => album.id === albumID);
    });
    const takenArtists = Favorites.artists.map((artistID) => {
      return Artists.find((artist) => artist.id === artistID);
    });
    const favoritesResponse: FavoritesResponse = {
      artists: takenArtists.length ? takenArtists : [],
      albums: takenAlbums.length ? takenAlbums : [],
      tracks: takenTracks.length ? takenTracks : [],
    };
    return favoritesResponse;
    return Favorites;
  }

  postNewFavoriteTrack(id: string) {
    const takenTrack = Tracks.find((track) => track.id === id);
    if (!takenTrack)
      throw new UnprocessableEntityException('Track with this ID is not found');
    Favorites.tracks.push(id);
    return takenTrack;
  }

  postNewFavoriteAlbum(id: string) {
    const takenAlbum = Albums.find((album) => album.id === id);
    if (!takenAlbum)
      throw new UnprocessableEntityException('Album with this ID is not found');
    Favorites.albums.push(id);
    return takenAlbum;
  }

  postNewFavoriteArtist(id: string) {
    const takenArtist = Artists.find((artist) => artist.id === id);
    if (!takenArtist)
      throw new UnprocessableEntityException(
        'Artist with this ID is not found',
      );
    Favorites.artists.push(id);
    return takenArtist;
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

  deleteFavoriteAlbum(id: string) {
    const takenAlbumEntity = Favorites.albums.find((entity) => entity === id);
    if (!takenAlbumEntity)
      throw new NotFoundException(
        'Album with this ID is not found in favorites',
      );
    const index = Favorites.albums.indexOf(takenAlbumEntity);
    Favorites.albums.splice(index, 1);
  }

  deleteFavoriteArtist(id: string) {
    const takenArtistEntity = Favorites.artists.find((entity) => entity === id);
    if (!takenArtistEntity)
      throw new NotFoundException(
        'Artist with this ID is not found in favorites',
      );
    const index = Favorites.artists.indexOf(takenArtistEntity);
    Favorites.artists.splice(index, 1);
  }
}
