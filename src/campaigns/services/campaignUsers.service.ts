import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';

import { CampaignUser } from '../entities/campaignUser.entity';
import { User } from '../entities/user.entity';
import { CreateCampaignUserDto, UpdateCampaignUserDto } from '../dtos/campaignUser.dtos';
import { AddCashBackDto } from '../dtos/cashBack.dtos';
import { AddPointDto } from '../dtos/point.dtos';
import { Campaign } from '../entities/campaign.entity';

import { CashBacksService } from '../services/cashBacks.service';
import { PointsService } from '../services/points.service';

@Injectable()
export class CampaignUsersService {
  constructor(
    @InjectRepository(CampaignUser) private campaignUserRepo: Repository<CampaignUser>,
    @InjectRepository(Campaign) private campaignRepo: Repository<Campaign>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private cashBackService: CashBacksService,
    private pointService: PointsService
  ) { }

  findAll() {
    return this.campaignUserRepo.find(
      {
        where: {
          status: true
        },
        take: 100
      });
  }

  async findOne(id: number) {

    const campaignUser = await this.campaignUserRepo.findOne({
      where: {
        id,
        status: true
      },
      relations: ['campaign', 'user'],
    });
    if (!campaignUser) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return campaignUser;
  }



  async create(data: CreateCampaignUserDto) {

    const userId = data.userId;
    const campaignId = data.campaignId

    const campaign = await this.campaignRepo.findOne({
      where: {
        id: campaignId,
        status: true
      },
      relations: {
        branch: {
          brand: true
        }
      }
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with id #${campaignId} not found`);
    }

    const user = await this.userRepo.findOne({
      where: {
        id: userId,
        status: true
      }
    });

    if (!user) {
      throw new NotFoundException(`User with id #${userId} not found`);
    }

    const cashBackDto: AddCashBackDto = new AddCashBackDto();
    const cashBackAmount = data.amount / campaign.valueCoin;

    cashBackDto.userId = userId;


    const pointDto: AddPointDto = new AddPointDto();
    const pointsAmount = data.amount / campaign.valuePoint;

    pointDto.brandId = campaign.branch.brandId;
    pointDto.userId = userId;

    if (campaign.minToAditionalPercentage > 0 && campaign.aditionalPercentage > 0 && data.amount > campaign.minToAditionalPercentage) {
      pointDto.amount = pointsAmount + (pointsAmount * campaign.aditionalPercentage);
      cashBackDto.amount = cashBackAmount + (cashBackAmount * campaign.aditionalPercentage);
    } else {
      cashBackDto.amount = cashBackAmount;
      pointDto.amount = pointsAmount
    }

    await this.cashBackService.add(cashBackDto);

    await this.pointService.add(pointDto);

    const campaignUser = await this.campaignUserRepo.create(data);

    return this.campaignUserRepo.save(campaignUser);
  }

  async update(id: number, changes: UpdateCampaignUserDto) {


    const campaignUser = await this.campaignUserRepo.findOne({
      where: {
        id,
        status: true
      }
    });

    if (!campaignUser) {
      throw new NotFoundException(`CampaignUser #${id} not found`);
    }

    this.campaignUserRepo.merge(campaignUser, changes);

    return this.campaignUserRepo.save(campaignUser);
  }

  async remove(id: number) {
    const campaignUser = await this.campaignUserRepo.findOne({
      where: {
        id,
        status: true
      }
    });

    if (!campaignUser) {
      throw new NotFoundException(`CampaignUser #${id} not found`);
    }
    return this.campaignUserRepo.delete(id);
  }
}
