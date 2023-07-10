import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';


import { CampaignUser } from './campaignUser.entity';
import { Point } from './point.entity';
import { CashBack } from './cashBack.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255, unique: true })
  userName: string;

  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  identification: string;

  @Column({ name: 'identification_type', type: 'varchar', length: 255 })
  identificationType: string;


  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

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


  @OneToMany(() => Point, (point) => point.user)
  points: Point[];


  @OneToMany(() => CashBack, (cashBack) => cashBack.user)
  cashBacks: CashBack[];


  @OneToMany(() => CampaignUser, (campaignUser) => campaignUser.user)
  campaignUsers: CampaignUser[];


}
