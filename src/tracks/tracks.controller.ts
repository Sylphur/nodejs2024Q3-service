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
import { TracksService } from './tracks.service';
import { PostTrackValidator } from './validators/postTrack.validator';
import { PutTrackValidator } from './validators/putTrack.validator';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getTracks() {
    return this.tracksService.getAllTracks();
  }

  @Get('/:id')
  getTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.getTrackById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  postTrack(@Body() dto: PostTrackValidator) {
    return this.tracksService.postNewTrack(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  putTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: PutTrackValidator,
  ) {
    return this.tracksService.editTrack(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    this.tracksService.deleteTrack(id);
  }
}
