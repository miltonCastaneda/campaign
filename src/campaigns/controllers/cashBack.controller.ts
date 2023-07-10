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

import { CashBacksService } from '../services/cashBacks.service';
import { AddCashBackDto, UpdateCashBackDto } from '../dtos/cashBack.dtos';
  

@ApiTags('cashBacks')
@Controller('cashBacks')
export class CashBacksController {
  constructor(private cashBacksService: CashBacksService) {}

  @Get()
  findAll() {
    return this.cashBacksService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.cashBacksService.findOne(id);
  }


  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCashBackDto,
  ) {
    return this.cashBacksService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cashBacksService.remove(+id);
  }
}
