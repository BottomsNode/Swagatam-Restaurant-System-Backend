import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CustomerEntity } from './entities/customer.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CustomerResponseDto } from './dto/customer.res.dto';
import * as bcrypt from 'bcrypt';
import { CustomerRepository } from './repository/customer.repository';
import { DbException } from '@/common/base-db-ops';
import {
  RpcBaseException,
  ArgumentNilException,
} from '@/common/base-db-ops/exceptions';
import { IPageable } from '@/common/base-db-ops/filtering';
import { IdParamDto } from '@/common/dto/IdParam.dto';
import { PageParams } from '@/common/dto/PageParam.dto';
import { ERROR_STATUS } from '@/common/error/code.status';
import { CreateCustomerDto } from './dto/customer.create.dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getAllCustomer(): Promise<
    CustomerResponseDto[] | IPageable<CustomerResponseDto>
  > {
    console.log(this.customerRepository);
    const entities = await this.customerRepository.allAsync();
    if (!entities || entities.length === 0) {
      throw new DbException(
        RpcBaseException.createPayload(`CUSTOMER_${ERROR_STATUS.NOT_FOUND}`),
      );
    }
    return entities;
  }

  async getCustomer(params: IdParamDto): Promise<CustomerResponseDto> {
    if (!params.Id)
      throw new ArgumentNilException('Customer ID cannot be null');
    const entity = await this.customerRepository.getAsync(params.Id);
    if (!entity) {
      throw new NotFoundException(`CUSTOMER_${ERROR_STATUS.NOT_FOUND}`);
    }
    return entity;
  }

  async getCustomerRecords(page_params: PageParams) {
    const paginateRecords = await this.customerRepository.pagedAsync({
      $page: page_params.page,
      $perPage: page_params.records,
    });
    if (!paginateRecords) {
      throw new NotFoundException(`CUSTOMER_PAGE_${ERROR_STATUS.NOT_FOUND}`);
    }
    return paginateRecords;
  }

  async getTotalCustomers() {
    const total_customers = await this.customerRepository.countAsync();
    if (!total_customers) {
      throw new NotFoundException(`CUSTOMER_PAGE_${ERROR_STATUS.NOT_FOUND}`);
    }
    return total_customers;
  }

  async updateCustomer(
    params: IdParamDto,
    updateDto: CreateCustomerDto,
  ): Promise<CustomerResponseDto> {
    if (!params.Id)
      throw new ArgumentNilException('Customer ID cannot be null');
    if (!updateDto?.email)
      throw new ArgumentNilException('Email cannot be null');

    const existingCustomer = await this.customerRepository.getAsync(params.Id);
    if (!existingCustomer) {
      throw new DbException(
        RpcBaseException.createPayload(`CUSTOMER_${ERROR_STATUS.NOT_FOUND}`),
      );
    }
    const hashedPassword = await bcrypt.hash(updateDto.password, 10);
    updateDto.password = hashedPassword;
    const updatedEntity = this.mapper.map(
      updateDto,
      CreateCustomerDto,
      CustomerEntity,
    );
    updatedEntity.id = params.Id;
    console.log('Updated ', updatedEntity);
    await this.customerRepository.updateAsync(updatedEntity);

    const refreshed = await this.customerRepository.getAsync(params.Id);
    if (!refreshed) {
      throw new DbException(
        RpcBaseException.createPayload(`CUSTOMER_${ERROR_STATUS.NOT_FOUND}`),
      );
    }

    return refreshed;
  }

  async deleteCustomer(params: IdParamDto): Promise<void> {
    if (!params.Id)
      throw new ArgumentNilException('Customer ID cannot be null');
    const deleted = await this.customerRepository.deleteAsync(params.Id);
    if (!deleted) {
      throw new DbException(
        RpcBaseException.createPayload(`CUSTOMER_${ERROR_STATUS.NOT_FOUND}`),
      );
    }
  }
}
