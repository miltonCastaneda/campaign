import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindOptionsWhere, In } from 'typeorm';

import { Campaign } from '../entities/campaign.entity';
import { Branch } from '../entities/branch.entity';
import { Brand } from '../entities/brand.entity';
import {
  CreateCampaignDto,
  UpdateCampaignDto,
  FiltercampaignsDto,
} from './../dtos/campaigns.dtos';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign) private campaignRepo: Repository<Campaign>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
  ) {}

  findAll(params?: FiltercampaignsDto) {
    if (params) {
      const where: FindOptionsWhere<Campaign> = {};
      const { limit, offset } = params;
      
      where.status = true;

      return this.campaignRepo.find({
        relations: ['branch'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.campaignRepo.find({
      relations: ['branch'],
    });
  }

  async findOne(id: number) {
    const campaign = await this.campaignRepo.findOne( {
      where: { id },
      relations: ['brand', 'branches'],
    });
    
    if (!campaign) {
      throw new NotFoundException(`Campaign #${id} not found`);
    }
    return campaign;
  }

  async create(data: CreateCampaignDto) {

    const newCampaign = this.campaignRepo.create(data);
    if (data.branchId) {
      const branch = await this.branchRepo.findOne({
        where: {
          id: data.branchId
        }
      });
      newCampaign.branch = branch;
    }

    return this.campaignRepo.save(newCampaign);
  }

  async update(id: number, changes: UpdateCampaignDto) {
    const campaign = await this.campaignRepo.findOneBy({id});
    if (changes.branchId) {
      const branch = await this.branchRepo.findOneBy({ id: changes.branchId });
      campaign.branch = branch;
    }
    
    this.campaignRepo.merge(campaign, changes);
    return this.campaignRepo.save(campaign);
  }

  remove(id: number) {
    return this.campaignRepo.delete(id);
  }
}
