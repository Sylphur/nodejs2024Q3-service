import { Injectable, NotFoundException } from '@nestjs/common';
import { Albums } from 'src/DB/database';
import { PostAlbumValidator } from './validators/postAlbum.validator';
import { Album } from 'src/shared/interfaces/dto.interface';
import { v4, validate } from 'uuid';
import { PutAlbumValidator } from './validators/putAlbum.validator';

@Injectable()
export class AlbumsService {
  getAllAlbums() {
    return Albums;
  }

  getAlbumById(id: string) {
    const takenAlbum = Albums.find((album) => album.id === id);
    if (!takenAlbum) throw new NotFoundException('Artist is not found');
    return takenAlbum;
  }

  postNewAlbum(dto: PostAlbumValidator) {
    const newAlbum: Album = {
      id: v4(),
      name: dto.name,
      year: dto.year,
      artistId: validate(dto.artistId) ? dto.artistId : null,
    };
    Albums.push(newAlbum);
    return newAlbum;
  }

  editAlbum(id: string, dto: PutAlbumValidator) {
    const takenAlbum = Albums.find((album) => album.id === id);
    if (!takenAlbum) throw new NotFoundException('Album is not found');
    const updatedAlbum: Album = {
      id: takenAlbum.id,
      name: dto.name ? dto.name : takenAlbum.name,
      year: dto.year ? dto.year : takenAlbum.year,
      artistId: validate(dto.artistId) ? dto.artistId : takenAlbum.artistId,
    };
    const index = Albums.indexOf(takenAlbum);
    Albums.splice(index, 1);
    Albums.push(updatedAlbum);
    return updatedAlbum;
  }

  deleteAlbum(id: string) {
    const takenAlbum = Albums.find((album) => album.id === id);
    if (!takenAlbum) throw new NotFoundException('Artist is not found');
    const index = Albums.indexOf(takenAlbum);
    Albums.splice(index, 1);
  }
}
