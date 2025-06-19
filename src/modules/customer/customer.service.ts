import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { Not, Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CustomerResponseDto } from './dto/customer.res.dto';
import { IdParamDto } from 'src/common/dto/IdParam.dto';
import { CreateCustomerDto } from './dto/customer.create.dto';
import { ERROR_STATUS } from 'src/common/error/code.status';
import { RpcBaseException } from 'src/common/base-db-ops/exceptions/base';
import { ArgumentNilException, DbException } from 'src/common/base-db-ops/exceptions';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerEntity) private readonly customerRepository: Repository<CustomerEntity>,
        @InjectMapper() private readonly mapper: Mapper,
    ) { }

    async getAllCustomer(): Promise<CustomerResponseDto[]> {
        const entities = await this.customerRepository.find({
            relations: ['orders'],
            order: { id: 'ASC' },
        });
        if (!entities || entities.length === 0) {
            throw new DbException(RpcBaseException.createPayload(`CUSTOMER_${ERROR_STATUS.NOT_FOUND}`));
        }
        return this.mapper.mapArray(entities, CustomerEntity, CustomerResponseDto);
    }

    async getCustomer(data: IdParamDto): Promise<CustomerResponseDto> {
        if (!data?.Id) {
            throw new ArgumentNilException('Customer ID cannot be null');
        }
        const entity = await this.customerRepository.findOne({
            where: { id: data.Id },
            relations: ['orders'],
            order: { id: 'ASC' },
        });
        if (!entity) {
            throw new DbException(RpcBaseException.createPayload(`CUSTOMER_${ERROR_STATUS.NOT_FOUND}`));
        }
        return this.mapper.map(entity, CustomerEntity, CustomerResponseDto);
    }

    async updateCustomer(params: IdParamDto, updateDto: CreateCustomerDto): Promise<CustomerResponseDto> {
        if (!params?.Id) {
            throw new ArgumentNilException('Customer ID cannot be null');
        }
        if (!updateDto?.email) {
            throw new ArgumentNilException('Email cannot be null');
        }
        const entity = await this.customerRepository.findOne({
            where: { id: params.Id },
        });
        if (!entity) {
            throw new DbException(RpcBaseException.createPayload(`CUSTOMER_${ERROR_STATUS.NOT_FOUND}`));
        }
        const existingCustomer = await this.customerRepository.findOne({
            where: { email: updateDto.email, id: Not(params.Id) },
        });
        if (existingCustomer) {
            throw new DbException(RpcBaseException.createPayload(`CUSTOMER_${ERROR_STATUS.ALREADY_EXISTS}`));
        }
        const updatedEntity = this.mapper.map(updateDto, CreateCustomerDto, CustomerEntity);
        updatedEntity.id = params.Id;
        await this.customerRepository.update(updatedEntity.id, updatedEntity);
        const customerResponse = await this.customerRepository.findOne({
            where: { id: params.Id },
        });
        if (!customerResponse) {
            throw new DbException(RpcBaseException.createPayload(`CUSTOMER_${ERROR_STATUS.NOT_FOUND}`));
        }
        return this.mapper.map(customerResponse, CustomerEntity, CustomerResponseDto);
    }

    async deleteCustomer(data: IdParamDto): Promise<void> {
        if (!data?.Id) {
            throw new ArgumentNilException('Customer ID cannot be null');
        }
        const entity = await this.customerRepository.findOne({
            where: { id: data.Id },
        });
        if (!entity) {
            throw new DbException(
                RpcBaseException.createPayload(
                    `CUSTOMER_${ERROR_STATUS.NOT_FOUND}`,
                    `Customer with ID ${data.Id} not found`,
                    HttpStatus.NOT_FOUND,
                ),
                `Customer with ID ${data.Id} not found`,
            );
        }
        await this.customerRepository.softDelete(entity.id);
    }
}

