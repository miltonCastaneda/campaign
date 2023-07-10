import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';


import { User } from './user.entity';
import { Brand } from './brand.entity';


@Entity('point')
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'amount', type: 'integer' })
  amount: number;

  @Column({ name: 'brand_id', type: 'integer' })
  brandId: number;

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

  @ManyToOne(() => Brand, (brand) => brand.points)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToOne(() => User, (user) => user.points)
  @JoinColumn({ name: 'user_id' })
  user: User;


}
