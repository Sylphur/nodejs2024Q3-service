import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favsService: FavoritesService) {}

  @Get()
  getFavs() {
    return this.favsService.getAllFavorites();
  }

  @Post('/track/:id')
  postFavTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.postNewFavoriteTrack(id);
  }

  @Post('/album/:id')
  postFavAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.postNewFavoriteAlbum(id);
  }

  // @Post('/artist/:id')
  // postFavArtist(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.favsService.postNewFavoriteArtist(id);
  // }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteFavTrack(@Param('id', ParseUUIDPipe) id: string) {
    this.favsService.deleteFavoriteTrack(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteFavAlbum(@Param('id', ParseUUIDPipe) id: string) {
    this.favsService.deleteFavoriteAlbum(id);
  }

  // @Delete('/artist/:id')
  // @HttpCode(204)
  // deleteFavArtist(@Param('id', ParseUUIDPipe) id: string) {
  //   this.favsService.deleteFavoriteArtist(id);
  // }
}
