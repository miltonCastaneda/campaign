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

import { ApiTags } from '@nestjs/swagger';

import { BranchesService } from '../services/branches.service';
import { CreateBranchDto, UpdateBranchDto } from './../dtos/branch.dtos';


@ApiTags('branches')
@Controller('branches')
export class BranchesController {
  constructor(private branchesService: BranchesService) { }

  @Get()
  findAll() {
    return this.branchesService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.branchesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateBranchDto) {
    return this.branchesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBranchDto,
  ) {
    return this.branchesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.branchesService.remove(+id);
  }
}
