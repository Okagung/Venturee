import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('search')
  search(@Query('keyword') keyword: string) {
    return this.eventsService.search(keyword);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateEventDto) {
    return this.eventsService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(Number(id));
  }
}