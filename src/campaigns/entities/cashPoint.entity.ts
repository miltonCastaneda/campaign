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


@Entity('cash_point_user')
export class CashPoint {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ name: 'value_money', type: 'integer'})
  valueMoneyAdded: number;

  @Column({ name: 'current_points', type: 'integer'})
  currentPoints: number;

  @Column({ name: 'current_cashback', type: 'integer'})
  currentCashback: number;

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

  @Column({ type: 'boolean' })
  status: boolean;

  @ManyToOne(() => Campaign, (campaign) => campaign.cashPoints)
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @ManyToOne(() => User, (user) => user.cashPoints)
  @JoinColumn({ name: 'user_id' })
  user: User;


}
