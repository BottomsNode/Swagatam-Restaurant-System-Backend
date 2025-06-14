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

    async updateCustomer(id: IdParamDto, updateDto: CreateCustomerDto): Promise<CustomerResponseDto> {
        const entity = await this.customerRepository.findOne({
            where: { id: id.Id },
        });
        if (!entity) {
            throw new HttpException(`Customer with ID ${id.Id} not found`, HttpStatus.NOT_FOUND);
        }
        const existingCustomer = await this.customerRepository.findOne({
            where: { email: updateDto.email, id: Not(id.Id) },
        });
        if (existingCustomer) {
            throw new HttpException('Customer with this email already exists', HttpStatus.CONFLICT);
        }
        const updatedEntity = this.mapper.map(updateDto, CreateCustomerDto, CustomerEntity);
        updatedEntity.id = id.Id;
        const savedEntity = await this.customerRepository.save(updatedEntity);
        return this.mapper.map(savedEntity, CustomerEntity, CustomerResponseDto);
    }

    async deleteCustomer(data: IdParamDto): Promise<void> {
        const entity = await this.customerRepository.findOne({
            where: { id: data.Id },
        });
        if (!entity) {
            throw new HttpException(`Customer with ID ${data.Id} not found`, HttpStatus.NOT_FOUND);
        }
        await this.customerRepository.remove(entity);
    }
}
