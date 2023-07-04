import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { Campaign } from './campaign.entity';
import { Brand } from './brand.entity';


@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  address: string;
  
  @Column({ name: 'brand_id', type: 'integer'})
  brandId: number;

  @Column({ type: 'varchar', length: 13 })
  phone: string;

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

  @OneToMany(() => Campaign, (campaign) => campaign.branch)
  campaigns: Campaign[];

  @ManyToOne(() => Brand, (brand) => brand.branches)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand[];


}
