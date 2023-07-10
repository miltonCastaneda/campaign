import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import {
  CreateCampaignDto,
  UpdateCampaignDto,
  FiltercampaignsDto,
} from '../dtos/campaigns.dtos';
import { CampaignsService } from './../services/campaigns.service';

@ApiTags('campaigns')
@Controller('campaigns')
export class CampaignsController {
  constructor(private campaignsService: CampaignsService) { }

  @Get()
  @ApiOperation({ summary: 'List of campaigns' })
  getcampaigns(@Query() params: FiltercampaignsDto) {
    return this.campaignsService.findAll(params);
  }

  @Get(':campaignId')
  @ApiOperation({ summary: 'get a campaign with using campaignId' })
  getOne(@Param('campaignId', ParseIntPipe) campaignId: number) {
    return this.campaignsService.findOne(campaignId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a campaign' })
  create(@Body() payload: CreateCampaignDto) {
    return this.campaignsService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a campaign using its campaignId' })
  update(@Param('id') id: number, @Body() payload: UpdateCampaignDto) {
    return this.campaignsService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a campaign using its campaignId' })
  delete(@Param('id') id: number) {
    return this.campaignsService.remove(id);
  }

}
