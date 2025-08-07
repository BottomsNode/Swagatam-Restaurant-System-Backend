import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectMapper } from '@automapper/nestjs';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryResponseDto } from '../dto/category.res.dto';
import { BaseRepo } from '@/common/base-db-ops';

@Injectable()
export class CategoryRepository extends BaseRepo<
  CategoryEntity,
  CategoryResponseDto,
  number
> {
  constructor(
    @InjectRepository(CategoryEntity) internalRepo: Repository<CategoryEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger() logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, CategoryEntity, CategoryResponseDto);
  }
}
