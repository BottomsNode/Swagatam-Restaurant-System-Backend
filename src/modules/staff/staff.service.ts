import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { StaffResponseDto } from './dto/staf.res.dto';
import { StaffEntity } from './entities/staff..entity';
import { CreateStaffDto } from './dto/staff.create.dto';
import { RpcBaseException } from '@/common/base-db-ops/exceptions';
import { IdParamDto } from '@/common/dto/IdParam.dto';
import { ERROR_STATUS } from '@/common/error/code.status';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getAllStaff(): Promise<StaffResponseDto[]> {
    const entities = await this.staffRepository.find({
      relations: ['orders'],
      order: { id: 'ASC' },
    });
    if (!entities || entities.length === 0) {
      throw new HttpException('No staff found', HttpStatus.NOT_FOUND);
    }
    return this.mapper.mapArray(entities, StaffEntity, StaffResponseDto);
  }

  async getStaff(data: IdParamDto): Promise<StaffResponseDto> {
    const entity = await this.staffRepository.findOne({
      where: { id: data.Id },
      relations: ['orders'],
      order: { id: 'ASC' },
    });
    if (!entity) {
      // throw new HttpException(`Staff with ID ${data.Id} not found`, HttpStatus.NOT_FOUND);
      throw new RpcBaseException(
        RpcBaseException.createPayload(`STAFF_${ERROR_STATUS.NOT_FOUND}`),
        HttpStatus.NOT_FOUND,
        ERROR_STATUS.NOT_FOUND,
      );
    }
    return this.mapper.map(entity, StaffEntity, StaffResponseDto);
  }

  async createStaff(createDto: CreateStaffDto): Promise<StaffResponseDto> {
    const existingStaff = await this.staffRepository.findOne({
      where: { email: createDto.email },
    });
    if (existingStaff) {
      throw new HttpException(
        'Staff with this email already exists',
        HttpStatus.CONFLICT,
      );
    }
    const entity = this.mapper.map(createDto, CreateStaffDto, StaffEntity);
    const savedEntity = await this.staffRepository.save(entity);
    return this.mapper.map(savedEntity, StaffEntity, StaffResponseDto);
  }

  async updateStaff(
    params: IdParamDto,
    updateDto: CreateStaffDto,
  ): Promise<StaffResponseDto> {
    const entity = await this.staffRepository.findOne({
      where: { id: params.Id },
    });
    if (!entity) {
      throw new HttpException(
        `Staff with ID ${params.Id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const existingStaff = await this.staffRepository.findOne({
      where: { email: updateDto.email, id: Not(params.Id) },
    });
    if (existingStaff) {
      throw new HttpException(
        'Staff with this email already exists',
        HttpStatus.CONFLICT,
      );
    }
    const updatedEntity = this.mapper.map(
      updateDto,
      CreateStaffDto,
      StaffEntity,
    );
    updatedEntity.id = params.Id;
    await this.staffRepository.update(updatedEntity.id, updatedEntity);
    const staffResponse = await this.staffRepository.findOne({
      where: { id: params.Id },
      relations: ['orders'],
    });
    if (!staffResponse) {
      throw new HttpException(
        `Failed to retrieve updated staff with ID ${params.Id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return this.mapper.map(staffResponse, StaffEntity, StaffResponseDto);
  }

  async deleteStaff(data: IdParamDto): Promise<void> {
    const entity = await this.staffRepository.findOne({
      where: { id: data.Id },
    });
    if (!entity) {
      throw new HttpException(
        `Staff with ID ${data.Id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.staffRepository.softDelete(entity.id);
  }
}
