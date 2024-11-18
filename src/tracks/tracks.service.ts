import { Injectable, NotFoundException } from '@nestjs/common';
import { Favorites, Tracks } from 'src/DB/database';
import { PostTrackValidator } from './validators/postTrack.validator';
import { Track } from 'src/shared/interfaces/dto.interface';
import { v4, validate } from 'uuid';

@Injectable()
export class TracksService {
  getAllTracks() {
    return Tracks;
  }

  getTrackById(id: string) {
    const takenTrack = Tracks.find((track) => track.id === id);
    if (!takenTrack) throw new NotFoundException('Track is not found');
    return takenTrack;
  }

  postNewTrack(dto: PostTrackValidator) {
    const newTrack: Track = {
      id: v4(),
      name: dto.name,
      artistId: validate(dto.artistId) ? dto.artistId : null,
      albumId: validate(dto.albumId) ? dto.albumId : null,
      duration: dto.duration,
    };
    Tracks.push(newTrack);
    return newTrack;
  }

  editTrack(id: string, dto: PostTrackValidator) {
    const takenTrack = Tracks.find((track) => track.id === id);
    if (!takenTrack) throw new NotFoundException('Track is not found');
    const updatedTrack: Track = {
      id: takenTrack.id,
      name: dto.name ? dto.name : takenTrack.name,
      artistId:
        validate(dto.artistId) || dto.artistId === null
          ? dto.artistId
          : takenTrack.artistId,
      albumId:
        validate(dto.albumId) || dto.albumId === null
          ? dto.albumId
          : takenTrack.albumId,
      duration: dto.duration ? dto.duration : takenTrack.duration,
    };
    const index = Tracks.indexOf(takenTrack);
    Tracks.splice(index, 1);
    Tracks.push(updatedTrack);
    return updatedTrack;
  }

  deleteTrack(id: string) {
    const takenTrack = Tracks.find((track) => track.id === id);
    if (!takenTrack) throw new NotFoundException('Track is not found');
    const index = Tracks.indexOf(takenTrack);
    Tracks.splice(index, 1);

    const favsIndex = Favorites.tracks.indexOf(id);
    if (favsIndex >= 0) Favorites.tracks.splice(favsIndex, 1);
  }
}
