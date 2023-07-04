import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CashPointsService } from '../services/cashPoints.service';
import { CreateCashPointDto, UpdateCashPointDto } from '../dtos/cashPoint.dtos';


@ApiTags('cashPoints')
@Controller('cashPoints')
export class CashPointsController {
  constructor(private cashPointsService: CashPointsService) {}

  @Get()
  findAll() {
    return this.cashPointsService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.cashPointsService.findOne(id);
  }

  @Get(':identification')
  @ApiOperation({ summary: 'To list cash and point for a user..' })
  getCashOrCoin(@Param('identification') identification: string) {
    return this.cashPointsService.findCashOrCoin(identification);
  }

  @Post()
  @ApiOperation({ summary: 'To add points and chasback' })
  create(@Body() payload: CreateCashPointDto) {
    return this.cashPointsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCashPointDto,
  ) {
    return this.cashPointsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cashPointsService.remove(+id);
  }
}
