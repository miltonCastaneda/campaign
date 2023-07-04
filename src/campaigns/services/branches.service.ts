import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Branch } from '../entities/branch.entity';
import { CreateBranchDto, UpdateBranchDto } from '../dtos/branch.dtos';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
  ) {}

  findAll() {
    return this.branchRepo.find();
  }

  async findOne(id: number) {
    const branch = this.branchRepo.findOne({
      where:{
        id
      },
      relations: ['campaigns'],
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
    this.branchRepo.merge(branch, changes);
    return this.branchRepo.save(branch);
  }

  remove(id: number) {
    return this.branchRepo.delete(id);
  }
}
