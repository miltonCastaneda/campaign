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
import { CampaignUsersController } from './controllers/campaignsUsers.controller';
import { PointsController } from './controllers/points.controller';
import { CashBacksController } from './controllers/cashBack.controller';
import { BranchesService } from './services/branches.service';
import { UsersService } from './services/users.service';
import { CampaignUsersService } from './services/campaignUsers.service';
import { PointsService } from './services/points.service';
import { CashBacksService } from './services/cashBacks.service';
import { User } from './entities/user.entity';
import { CampaignUser } from './entities/campaignUser.entity';
import { Branch } from './entities/branch.entity';
import { Point } from './entities/point.entity';
import { CashBack } from './entities/cashBack.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Campaign, Brand, Branch, User, CampaignUser, Point, CashBack])],
  controllers: [CampaignsController, BranchesController, BrandsController, UsersController, CampaignUsersController, PointsController, CashBacksController ],
  providers: [CampaignsService, BrandsService, BranchesService, UsersService, CampaignUsersService, PointsService, CashBacksService],
  exports: [TypeOrmModule],
})
export class CampaignsModule {}
