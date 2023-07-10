import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashBack } from '../entities/cashBack.entity';
import { User } from '../entities/user.entity';
import { AddCashBackDto, UpdateCashBackDto } from '../dtos/cashBack.dtos';


@Injectable()
export class CashBacksService {
  constructor(
    @InjectRepository(CashBack) private cashBackRepo: Repository<CashBack>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }

  findAll() {
    return this.cashBackRepo.find(
      {
        where: {
          status: true
        },
        relations: ['user'],
        take: 100
      });
  }

  async findOne(id: number) {

    const point = await this.cashBackRepo.findOne({
      where: {
        id,
        status: true
      },
      relations: ['user'],
    });
    if (!point) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return point;
  }

  async add(data: AddCashBackDto) {

    let cashBack: CashBack;
    const userId = data.userId;

    const oldCashBack = await this.findByUser(userId);

    if (!oldCashBack) {
      cashBack = this.cashBackRepo.create(data)
    } else {
      data.amount = oldCashBack.amount + data.amount;
      await this.cashBackRepo.merge(oldCashBack, data);
      cashBack = oldCashBack;
    }

    return this.cashBackRepo.save(cashBack);
  }

  async findByUser(id: number) {

    const point = await this.cashBackRepo.findOne({
      where: {
        userId: id,
        status: true
      },
      order: {
        createAt: 'DESC'
      }
    });


    return point;
  }

  async update(id: number, changes: UpdateCashBackDto) {

    const userId = changes.userId;

    const user = await this.userRepo.findOne({
      where: {
        id: userId,
        status: true
      }
    });

    if (!user) {
      throw new NotFoundException(`User with id #${userId} not found`);
    }

    const point = await this.findOne(id);

    this.cashBackRepo.merge(point, changes);

    return this.cashBackRepo.save(point);
  }

  async remove(id: number) {
    const point = await this.cashBackRepo.findOne({
      where: {
        id,
        status: true
      }
    });

    if (!point) {
      throw new NotFoundException(`CashBack #${id} not found`);
    }
    return this.cashBackRepo.delete(id);
  }
}
