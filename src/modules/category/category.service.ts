import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IdParamDto } from "src/common/dto/IdParam.dto";
import { Repository, Not } from "typeorm";
import { CategoryResponseDto } from "./dto/category.res.dto";
import { CategoryEntity } from "./entities/category.entity";
import { CreateCategoryDto } from "./dto/category.create.dto";
import { RpcBaseException } from 'src/common/base-db-ops/exceptions/base';
import { ERROR_STATUS } from "src/common/error/code.status";
import { DbException } from "src/common/base-db-ops";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
        @InjectMapper() private readonly mapper: Mapper,
    ) { }

    async getAllCategory(): Promise<CategoryResponseDto[]> {
        const entities = await this.categoryRepository.find({
            relations: ['menuItems'],
            order: { id: 'ASC' },
        });
        if (!entities || entities.length === 0) {
            throw new DbException(RpcBaseException.createPayload(`CATEGORY_${ERROR_STATUS.NOT_FOUND}`, 'No category found', HttpStatus.NOT_FOUND,), 'No category found',);
        }
        return this.mapper.mapArray(entities, CategoryEntity, CategoryResponseDto);
    }

    async getCategory(data: IdParamDto): Promise<CategoryResponseDto> {
        const entity = await this.categoryRepository.findOne({
            where: { id: data.Id },
            relations: ['menuItems'],
            order: { id: 'ASC' },
        });
        if (!entity) {
            throw new DbException(RpcBaseException.createPayload(`CATEGORY_${ERROR_STATUS.NOT_FOUND}`, 'No category found', HttpStatus.NOT_FOUND,), 'No category found',);
        }
        return this.mapper.map(entity, CategoryEntity, CategoryResponseDto);
    }

    async createCategory(createDto: CreateCategoryDto): Promise<CategoryResponseDto> {
        const existingCategory = await this.categoryRepository.findOne({
            where: { name: createDto.name },
        });
        if (existingCategory) {
            throw new DbException(RpcBaseException.createPayload(`CATEGORY_${ERROR_STATUS.DUPLICATE}`, 'Category already exists', HttpStatus.BAD_REQUEST,), 'Category already exists',);
        }
        const entity = this.mapper.map(createDto, CreateCategoryDto, CategoryEntity);
        const savedEntity = await this.categoryRepository.save(entity);
        return this.mapper.map(savedEntity, CategoryEntity, CategoryResponseDto);
    }

    async updateCategory(params: IdParamDto, updateDto: CreateCategoryDto): Promise<CategoryResponseDto> {
        const entity = await this.categoryRepository.findOne({
            where: { id: params.Id },
        });
        if (!entity) {
            throw new DbException(RpcBaseException.createPayload(`CATEGORY_${ERROR_STATUS.NOT_FOUND}`));
        }
        const existingCategory = await this.categoryRepository.findOne({
            where: { name: updateDto.name, id: Not(params.Id) },
        });
        if (existingCategory) {
            throw new DbException(RpcBaseException.createPayload(`CATEGORY_${ERROR_STATUS.ALREADY_EXISTS}`));
        }
        const updatedEntity = this.mapper.map(updateDto, CreateCategoryDto, CategoryEntity);
        updatedEntity.id = params.Id;
        await this.categoryRepository.update(updatedEntity.id, updatedEntity);
        const categoryResponse = await this.categoryRepository.findOne({
            where: { id: params.Id },
            relations: ['menuItems'],
        });
        if (!categoryResponse) {
            throw new DbException(RpcBaseException.createPayload(`CATEGORY_${ERROR_STATUS.NOT_FOUND}`));
        }
        return this.mapper.map(categoryResponse, CategoryEntity, CategoryResponseDto);
    }

    async deleteCategory(data: IdParamDto): Promise<void> {
        const entity = await this.categoryRepository.findOne({
            where: { id: data.Id },
        });
        if (!entity) {
            throw new DbException(RpcBaseException.createPayload(`CATEGORY_${ERROR_STATUS.NOT_FOUND}`));
        }
        await this.categoryRepository.softDelete(entity.id);
    }
}