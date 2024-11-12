import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { PostAlbumValidator } from './validators/postAlbum.validator';
import { PutAlbumValidator } from './validators/putAlbum.validator';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAlbums() {
    return this.albumsService.getAllAlbums();
  }

  @Get('/:id')
  getTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.getAlbumById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  postTrack(@Body() dto: PostAlbumValidator) {
    return this.albumsService.postNewAlbum(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  putTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: PutAlbumValidator,
  ) {
    return this.albumsService.editAlbum(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    this.albumsService.deleteAlbum(id);
  }
}
