import {
  Album,
  Artist,
  Favorite,
  Track,
  User,
} from 'src/shared/interfaces/dto.interface';
import { v4 } from 'uuid';

export const Users: User[] = [
  {
    id: v4(),
    login: 'Sylphur',
    password: '12345',
    version: 1,
    createdAt: Date.now() - Math.floor(Math.random() * 10000),
    updatedAt: Date.now(),
  },
];

export const Artists: Artist[] = [
  {
    id: v4(),
    name: 'Rammstein',
    grammy: true,
  },
];

export const Albums: Album[] = [
  {
    id: v4(),
    name: 'Mutter',
    year: 2001,
    artistId: Artists[0].id,
  },
];

export const Tracks: Track[] = [
  {
    id: v4(),
    name: 'Sonne',
    artistId: Artists[0].id,
    albumId: Albums[0].id,
    duration: 245,
  },
];

export const Favorites: Favorite[] = [
  {
    artists: [Artists[0].id],
    albums: [],
    tracks: [Tracks[0].id],
  },
];
