import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandsRepo: Repository<Brand>) {}

  findAll() {
    return this.brandsRepo.find();
  }

  findOne(id: number) {
    //TODO: Actualizar para trajer todas las campanias de los branches asociacos a al brand buscado
    const campaign = this.brandsRepo.findOne({
      where: {
        id
      },
      relations: ['branches'],
    });
    if (!campaign) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return campaign;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandsRepo.create(data);
    return this.brandsRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.findOne(id);
    this.brandsRepo.merge(brand, changes);
    return this.brandsRepo.save(brand);
  }

  remove(id: number) {
    return this.brandsRepo.delete(id);
  }
}
