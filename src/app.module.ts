import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CampaignsModule } from './campaigns/campaign.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    CampaignsModule,
    DatabaseModule,
  ]
})
export class AppModule {}
