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
import { ArtistsService } from './artists.service';
import { PostArtistValidator } from './validators/postArtist.validator';
import { PutArtistValidator } from './validators/putArtist.validator';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getTracks() {
    return this.artistsService.getAllArtists();
  }

  @Get('/:id')
  getTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.getArtistById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  postTrack(@Body() dto: PostArtistValidator) {
    return this.artistsService.postNewArtist(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  putTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: PutArtistValidator,
  ) {
    return this.artistsService.editArtist(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    this.artistsService.deleteArtist(id);
  }
}
