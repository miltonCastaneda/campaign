import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CampaignsController } from './controllers/campaigns.controller';
import { CampaignsService } from './services/campaigns.service';
import { Campaign } from './entities/campaign.entity';
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { Brand } from './entities/brand.entity';
import { BranchesController } from './controllers/branches.controller';
import { UsersController } from './controllers/users.controller';
import { CashPointsController } from './controllers/cashPoints.controller';
import { BranchesService } from './services/branches.service';
import { UsersService } from './services/users.service';
import { CashPointsService } from './services/cashPoints.service';
import { User } from './entities/user.entity';
import { CashPoint } from './entities/cashPoint.entity';
import { Branch } from './entities/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, Brand, Branch, User, CashPoint])],
  controllers: [CampaignsController, BranchesController, BrandsController, UsersController, CashPointsController ],
  providers: [CampaignsService, BrandsService, BranchesService, UsersService, CashPointsService],
  exports: [TypeOrmModule],
})
export class CampaignsModule {}
