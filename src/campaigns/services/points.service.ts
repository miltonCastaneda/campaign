import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Point } from '../entities/point.entity';
import { User } from '../entities/user.entity';
import { AddPointDto, UpdatePointDto } from '../dtos/point.dtos';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point) private pointRepo: Repository<Point>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }

  findAll() {
    return this.pointRepo.find(
      {
        where: {
          status: true
        },
        relations: ['brand', 'user'],
        take: 100
      });
  }

  async findOne(id: number) {

    const point = await this.pointRepo.findOne({
      where: {
        id,
        status: true
      },
      relations: ['brand', 'user'],
    });
    if (!point) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return point;
  }


  async add(data: AddPointDto) {

    let point: Point;
    const oldPoint = await this.findByUser(data);

    if (!oldPoint) {
      point = this.pointRepo.create(data);
    } else {
      data.amount = oldPoint.amount + data.amount;
      this.pointRepo.merge(oldPoint, data);
      point = oldPoint;
    }

    return this.pointRepo.save(point);
  }

  async findByUser(data: AddPointDto) {

    const point = await this.pointRepo.findOne({
      where: {
        userId: data.userId,
        brandId: data.brandId,
        status: true
      },
      order: {
        createAt: 'DESC'
      }
    });

    return point;
  }

  async update(id: number, changes: UpdatePointDto) {

    const userId = changes.userId;
    const brandId = changes.brandId

    const brand = await this.brandRepo.findOne({
      where: {
        id: brandId,
        status: true
      }
    });

    if (!brand) {
      throw new NotFoundException(`Brand with id #${brandId} not found`);
    }

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

    this.pointRepo.merge(point, changes);

    return this.pointRepo.save(point);
  }

  async remove(id: number) {
    const point = await this.pointRepo.findOne({
      where: {
        id,
        status: true
      }
    });

    if (!point) {
      throw new NotFoundException(`Point #${id} not found`);
    }
    return this.pointRepo.delete(id);
  }
}
