import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { CustomerResponseDto } from '../dto/customer.res.dto';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectMapper } from '@automapper/nestjs';
import { BaseRepo } from '@/common/base-db-ops';

@Injectable()
export class CustomerRepository extends BaseRepo<
  CustomerEntity,
  CustomerResponseDto,
  number
> {
  constructor(
    @InjectRepository(CustomerEntity) internalRepo: Repository<CustomerEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger() logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, CustomerEntity, CustomerResponseDto);
  }
}
