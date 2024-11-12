import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { TracksService } from 'src/tracks/tracks.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, TracksService],
})
export class AlbumsModule {}
