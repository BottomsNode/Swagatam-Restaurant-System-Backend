import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IdParamDto } from "src/common/dto/IdParam.dto";
import { Repository, Not } from "typeorm";
import { CategoryResponseDto } from "./dto/category.res.dto";
import { CategoryEntity } from "./entities/category.entity";
import { CreateCategoryDto } from "./dto/category.create.dto";


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
            throw new HttpException('No categories found', HttpStatus.NOT_FOUND);
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
            throw new HttpException(`Category with ID ${data.Id} not found`, HttpStatus.NOT_FOUND);
        }
        return this.mapper.map(entity, CategoryEntity, CategoryResponseDto);
    }

    async createCategory(createDto: CreateCategoryDto): Promise<CategoryResponseDto> {
        const existingCategory = await this.categoryRepository.findOne({
            where: { name: createDto.name },
        });
        if (existingCategory) {
            throw new HttpException('Category with this name already exists', HttpStatus.CONFLICT);
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
            throw new HttpException(`Category with ID ${params.Id} not found`, HttpStatus.NOT_FOUND);
        }
        const existingCategory = await this.categoryRepository.findOne({
            where: { name: updateDto.name, id: Not(params.Id) },
        });
        if (existingCategory) {
            throw new HttpException('Category with this name already exists', HttpStatus.CONFLICT);
        }
        const updatedEntity = this.mapper.map(updateDto, CreateCategoryDto, CategoryEntity);
        updatedEntity.id = params.Id;
        await this.categoryRepository.update(updatedEntity.id, updatedEntity);
        const categoryResponse = await this.categoryRepository.findOne({
            where: { id: params.Id },
            relations: ['menuItems'],
        });
        if (!categoryResponse) {
            throw new HttpException(`Failed to retrieve updated category with ID ${params.Id}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this.mapper.map(categoryResponse, CategoryEntity, CategoryResponseDto);
    }

    async deleteCategory(data: IdParamDto): Promise<void> {
        const entity = await this.categoryRepository.findOne({
            where: { id: data.Id },
        });
        if (!entity) {
            throw new HttpException(`Category with ID ${data.Id} not found`, HttpStatus.NOT_FOUND);
        }
        await this.categoryRepository.softDelete(entity.id);
    }
}