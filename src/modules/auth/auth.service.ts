import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { LoginCustomerDto } from './dto/login.dto';
import { CustomerResponseDto } from '../customer/dto/customer.res.dto';
import { CreateCustomerDto } from '../customer/dto/customer.create.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customerRepository: Repository<CustomerEntity>,
        @InjectMapper() private readonly mapper: Mapper,
        private readonly jwtService: JwtService,
    ) { }

    async registerCustomer(createDto: CreateCustomerDto): Promise<CustomerResponseDto> {
        const existingCustomer = await this.customerRepository.findOne({
            where: { email: createDto.email },
        });
        if (existingCustomer) {
            throw new HttpException('Customer with this email already exists', HttpStatus.CONFLICT);
        }

        const hashedPassword = await bcrypt.hash(createDto.password, 10);
        const entity = this.mapper.map(createDto, CreateCustomerDto, CustomerEntity);
        entity.password = hashedPassword;
        const savedEntity = await this.customerRepository.save(entity);
        return this.mapper.map(savedEntity, CustomerEntity, CustomerResponseDto);
    }

    async loginCustomer(loginDto: LoginCustomerDto): Promise<{ access_token: string }> {
        const customer = await this.customerRepository.findOne({
            where: { email: loginDto.email },
        });
        if (!customer) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, customer.password);
        if (!isPasswordValid) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const payload = { sub: customer.id, email: customer.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateCustomer(email: string, password: string): Promise<CustomerEntity | null> {
        const customer = await this.customerRepository.findOne({ where: { email } });
        if (customer && (await bcrypt.compare(password, customer.password))) {
            return customer;
        }
        return null;
    }
}
