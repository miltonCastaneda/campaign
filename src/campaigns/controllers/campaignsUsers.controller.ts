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

import { CampaignUsersService } from '../services/campaignUsers.service';
import { CreateCampaignUserDto, UpdateCampaignUserDto } from '../dtos/campaignUser.dtos';
  

@ApiTags('campaignUsers')
@Controller('campaignUsers')
export class CampaignUsersController {
  constructor(private campaignUsersService: CampaignUsersService) {}

  @Get()
  findAll() {
    return this.campaignUsersService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.campaignUsersService.findOne(id);
  }


  @Post()
  @ApiOperation({ summary: 'To add points and chasback' })
  create(@Body() payload: CreateCampaignUserDto) {
    return this.campaignUsersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCampaignUserDto,
  ) {
    return this.campaignUsersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.campaignUsersService.remove(+id);
  }
}
