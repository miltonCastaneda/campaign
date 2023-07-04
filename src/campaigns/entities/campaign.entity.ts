import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';

import { Branch } from './branch.entity';
import { CashPoint } from './cashPoint.entity';

@Entity({ name: 'campaigns' })
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ name:'value_coin', type: 'int' })
  valueCoin: number;

  @Column({ name: 'value_point', type: 'int' })
  valuePoint: number;

  @Column({ name: 'value_min_redeem_p', type: 'int' })
  valueMinRedeemP: number;

  @Column({ name: 'value_to_redeem_c', type: 'int' })
  valueToRedeemC: number;

  @Column({ name: 'value_to_redeem_p', type: 'int' })
  valueToRedeemP: number;

  @Column({ name: 'aditional_percentage', type: 'int' })
  aditionalPercentage: number;


  @Column({ name: 'min_to_aditional_percentaje', type: 'int' })
  minToaditionalPercentage: number;

  

  @Column({ name: 'type', type: 'varchar', length: 1 })
  type: string;
//TODO: Pasar a fechas ingresasdas por el usuario
  @CreateDateColumn({
    name: 'start_date',
    type: 'timestamptz'
  })
  startDate: Date;

  @CreateDateColumn({
    name: 'finishing_date',
    type: 'timestamptz'
  })
  finishingDate: Date;


  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  
  @Column({ type: 'boolean' })
  status: boolean;

  @OneToMany(() => CashPoint, (cashPoint) => cashPoint.campaign )
  cashPoints: CashPoint[];


  @ManyToOne(() => Branch, (branch) => branch.campaigns)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  //TODO: CREAR RELACION CON USUARIO

}
