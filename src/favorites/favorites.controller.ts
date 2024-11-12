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

  @Delete('/track/:id')
  @HttpCode(204)
  deleteFavTrack(@Param('id', ParseUUIDPipe) id: string) {
    this.favsService.deleteFavoriteTrack(id);
  }
}
