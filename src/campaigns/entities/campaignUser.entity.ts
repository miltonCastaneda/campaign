import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { Campaign } from './campaign.entity';

import { User } from './user.entity';


@Entity('campaign_user')
export class CampaignUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'amount', type: 'integer' })
  amount: number;

  @Column({ name: 'campaign_id', type: 'integer' })
  campaignId: number;

  @Column({ name: 'user_id', type: 'integer' })
  userId: number;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @ManyToOne(() => Campaign, (campaign) => campaign.campaignUsers)
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @ManyToOne(() => User, (user) => user.campaignUsers)
  @JoinColumn({ name: 'user_id' })
  user: User;


}
