import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdParamDto } from 'src/common/dto/IdParam.dto';
import { Repository, Not } from 'typeorm';
import { TableResponseDto } from './dto/table.res.dto';
import { TableEntity, TableStatus } from './entities/table.entity';
import { CreateTableDto } from './dto/table.create.dto';

@Injectable()
export class TableService {
    constructor(
        @InjectRepository(TableEntity) private readonly tableRepository: Repository<TableEntity>,
        @InjectMapper() private readonly mapper: Mapper,
    ) { }

    async getAllTable(): Promise<TableResponseDto[]> {
        const entities = await this.tableRepository.find({
            where: { status: TableStatus.AVAILABLE },
            relations: ['orders'],
            order: { id: 'ASC' },
        });
        if (!entities || entities.length === 0) {
            throw new HttpException('No tables found', HttpStatus.NOT_FOUND);
        }
        return this.mapper.mapArray(entities, TableEntity, TableResponseDto);
    }

    async getTable(data: IdParamDto): Promise<TableResponseDto> {
        const entity = await this.tableRepository.findOne({
            where: { id: data.Id, status: TableStatus.AVAILABLE },
            relations: ['orders'],
            order: { id: 'ASC' },
        });

        if (!entity) {
            throw new NotFoundException(`Table with ID ${data.Id} and status AVAILABLE not found`);
        }

        return this.mapper.map(entity, TableEntity, TableResponseDto);
    }

    async createTable(createDto: CreateTableDto): Promise<TableResponseDto> {
        const existingTable = await this.tableRepository.findOne({
            where: { tableNumber: createDto.tableNumber },
        });
        if (existingTable) {
            throw new HttpException('Table with this table number already exists', HttpStatus.CONFLICT);
        }
        const entity = this.mapper.map(createDto, CreateTableDto, TableEntity);
        const savedEntity = await this.tableRepository.save(entity);
        return this.mapper.map(savedEntity, TableEntity, TableResponseDto);
    }

    async updateTable(params: IdParamDto, updateDto: CreateTableDto): Promise<TableResponseDto> {
        const entity = await this.tableRepository.findOne({
            where: { id: params.Id },
        });
        if (!entity) {
            throw new HttpException(`Table with ID ${params.Id} not found`, HttpStatus.NOT_FOUND);
        }
        const existingTable = await this.tableRepository.findOne({
            where: { tableNumber: updateDto.tableNumber, id: Not(params.Id) },
        });
        if (existingTable) {
            throw new HttpException('Table with this table number already exists', HttpStatus.CONFLICT);
        }
        const updatedEntity = this.mapper.map(updateDto, CreateTableDto, TableEntity);
        updatedEntity.id = params.Id;
        await this.tableRepository.update(updatedEntity.id, updatedEntity);
        const tableResponse = await this.tableRepository.findOne({
            where: { id: params.Id },
            relations: ['orders'],
        });
        if (!tableResponse) {
            throw new HttpException(`Failed to retrieve updated table with ID ${params.Id}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this.mapper.map(tableResponse, TableEntity, TableResponseDto);
    }

    async deleteTable(data: IdParamDto): Promise<void> {
        const entity = await this.tableRepository.findOne({
            where: { id: data.Id },
        });
        if (!entity) {
            throw new HttpException(`Table with ID ${data.Id} not found`, HttpStatus.NOT_FOUND);
        }
        await this.tableRepository.softDelete(entity.id);
    }
}