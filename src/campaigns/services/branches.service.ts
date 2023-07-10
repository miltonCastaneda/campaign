import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Branch } from '../entities/branch.entity';
import { CreateBranchDto, UpdateBranchDto } from '../dtos/branch.dtos';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
  ) { }

  findAll() {
    return this.branchRepo.find({
      where: {
        status: true
      },
      take: 100
    });
  }

  async findOne(id: number) {
    const branch = await this.branchRepo.findOne({
      where: {
        id,
        status: true
      },
      relations: ['campaigns', 'brand']
    });

    if (!branch) {
      throw new NotFoundException(`Branch #${id} not found`);
    }
    return branch;
  }

  create(data: CreateBranchDto) {
    const newBranch = this.branchRepo.create(data);
    return this.branchRepo.save(newBranch);
  }

  async update(id: number, changes: UpdateBranchDto) {
    const branch = await this.findOne(id);

    if (!branch) {
      throw new NotFoundException(`Branch #${id} not found`);
    }

    this.branchRepo.merge(branch, changes);
    return this.branchRepo.save(branch);
  }

  async remove(id: number) {
    const branch = await this.findOne(id);

    if (!branch) {
      throw new NotFoundException(`Branch #${id} not found`);
    }
    return this.branchRepo.delete(id);
  }
}
