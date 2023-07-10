import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }

  findAll() {
    return this.userRepo.find({
      where: {
        status: true
      },
      take: 100
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: {
        id,
        status: true
      },
      relations: ['campaignUsers'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async getByIdentification(identification: string) {

    const where: FindOptionsWhere<User> = {};

    where.status = true;
    where.identification = identification;

    const user = await this.userRepo.findOne({
      where: where,
      relations: ['campaignUsers'],
    });

    if (!user) {
      throw new NotFoundException(`User with identification #${identification} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }

    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  async remove(id: number) {

    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }

    return this.userRepo.delete(id);
  }
}
