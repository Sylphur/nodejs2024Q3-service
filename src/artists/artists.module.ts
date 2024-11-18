import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, AlbumsService, TracksService],
})
export class ArtistsModule {}
