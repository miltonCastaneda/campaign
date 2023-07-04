import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere , FindOptionsOrderValue} from 'typeorm';

import { CashPoint } from '../entities/cashPoint.entity';
import { User } from '../entities/user.entity';
import { CreateCashPointDto, UpdateCashPointDto } from '../dtos/cashPoint.dtos';

@Injectable()
export class CashPointsService {
  constructor(
    @InjectRepository(CashPoint) private cashPointRepo: Repository<CashPoint>,
  ) {}

  findAll() {
    return this.cashPointRepo.find();
  }

  findOne(id: number) {
   
    const cashPoint = this.cashPointRepo.findOne({
      where: {
        id
      },
      relations: ['campaigns','users'],
    });
    if (!cashPoint) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return cashPoint;
  }

  async findCashOrCoin(identification: string) {
    const where: FindOptionsWhere<User> = {};

    where.status = true;
    where.identification = identification;

    const cashPoint = this.cashPointRepo.findOne({
      where,
      relations: ['campaigns','users'],
      order:{
        id: "DESC"
      }
    });

    if (!cashPoint) {
      throw new NotFoundException(`CashPoint #${identification} not found`);
    }
    return cashPoint;
  }

  create(data: CreateCashPointDto) {
    const newCashPoint = this.cashPointRepo.create(data);
    return this.cashPointRepo.save(newCashPoint);
  }

  async update(id: number, changes: UpdateCashPointDto) {
    const cashPoint = await this.findOne(id);
    this.cashPointRepo.merge(cashPoint, changes);
    return this.cashPointRepo.save(cashPoint);
  }

  remove(id: number) {
    return this.cashPointRepo.delete(id);
  }
}
