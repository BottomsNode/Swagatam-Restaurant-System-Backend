import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { Not, Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CustomerResponseDto } from './dto/customer.res.dto';
import { IdParamDto } from 'src/common/dto/IdParam.dto';
import { CreateCustomerDto } from './dto/customer.create.dto';

@Injectable()
export class CustomerService {

    constructor(
        @InjectRepository(CustomerEntity) private readonly customerRepository: Repository<CustomerEntity>,
        @InjectMapper() private readonly mapper: Mapper
    ) { }

    async getAllCustomer(): Promise<CustomerResponseDto[]> {
        const entities = await this.customerRepository.find({
            relations: ['orders'],
            order: { id: 'ASC' },
        });
        if (!entities || entities.length === 0) {
            throw new HttpException('No customers found', HttpStatus.NOT_FOUND);
        }
        console.log(entities);
        return this.mapper.mapArray(entities, CustomerEntity, CustomerResponseDto);
    }

    async getCustomer(data: IdParamDto): Promise<CustomerResponseDto> {
        const entity = await this.customerRepository.findOne({
            where: { id: data.Id },
            relations: ['orders'],
            order: { id: 'ASC' },
        });
        if (!entity) {
            throw new HttpException(`Customer with ID ${data.Id} not found`, HttpStatus.NOT_FOUND);
        }
        return this.mapper.map(entity, CustomerEntity, CustomerResponseDto);
    }

    async createCustomer(createDto: CreateCustomerDto): Promise<CustomerResponseDto> {
        const existingCustomer = await this.customerRepository.findOne({
            where: { email: createDto.email },
        });
        if (existingCustomer) {
            throw new HttpException('Customer with this email already exists', HttpStatus.CONFLICT);
        }
        const entity = this.mapper.map(createDto, CreateCustomerDto, CustomerEntity);
        const savedEntity = await this.customerRepository.save(entity);
        return this.mapper.map(savedEntity, CustomerEntity, CustomerResponseDto);
    }

    async updateCustomer(params: IdParamDto, updateDto: CreateCustomerDto): Promise<CustomerResponseDto> {
        const entity = await this.customerRepository.findOne({
            where: { id: params.Id },
        });
        if (!entity) {
            throw new HttpException(`Customer with ID ${params.Id} not found`, HttpStatus.NOT_FOUND);
        }
        const existingCustomer = await this.customerRepository.findOne({
            where: { email: updateDto.email, id: Not(params.Id) },
        });
        if (existingCustomer) {
            throw new HttpException('Customer with this email already exists', HttpStatus.CONFLICT);
        }
        const updatedEntity = this.mapper.map(updateDto, CreateCustomerDto, CustomerEntity);
        updatedEntity.id = params.Id;
        await this.customerRepository.update(updatedEntity.id, updatedEntity);
        const customerResponse = await this.customerRepository.findOne({
            where: { email: updateDto.email, id: Not(params.Id) },
        });
        return this.mapper.map(customerResponse, CustomerEntity, CustomerResponseDto);
    }

    async deleteCustomer(data: IdParamDto): Promise<void> {
        const entity = await this.customerRepository.findOne({
            where: { id: data.Id },
        });
        if (!entity) {
            throw new HttpException(`Customer with ID ${data.Id} not found`, HttpStatus.NOT_FOUND);
        }
        await this.customerRepository.softDelete(entity.id);
    }

    async getCustomerByEmail(email) {
        const customer = await this.customerRepository.findOne({
            where: { email: email },
        });
        if (!customer) {
            throw new HttpException(`Customer not found`, HttpStatus.NOT_FOUND);
        }
        return this.mapper.map(customer, CustomerEntity, CustomerResponseDto);
    }
}
