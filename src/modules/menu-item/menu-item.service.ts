import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { MenuItemResponseDto } from './dto/menuItem.res.dto';
import { MenuItemEntity } from './entities/menu_item.entity';
import { CreateMenuItemDto } from './dto/menuItem.create.dto';
import { IdParamDto } from '@/common/dto/IdParam.dto';

@Injectable()
export class MenuItemService {
    constructor(
        @InjectRepository(MenuItemEntity) private readonly menuItemRepository: Repository<MenuItemEntity>,
        @InjectMapper() private readonly mapper: Mapper,
    ) { }

    async getAllMenuItem(): Promise<MenuItemResponseDto[]> {
        const entities = await this.menuItemRepository.find({
            relations: ['category'],
            order: { id: 'ASC' },
        });
        if (!entities || entities.length === 0) {
            throw new HttpException('No menu items found', HttpStatus.NOT_FOUND);
        }
        return this.mapper.mapArray(entities, MenuItemEntity, MenuItemResponseDto);
    }

    async getMenuItem(data: IdParamDto): Promise<MenuItemResponseDto> {
        const entity = await this.menuItemRepository.findOne({
            where: { id: data.Id },
            relations: ['category', 'orderItems'],
            order: { id: 'ASC' },
        });
        if (!entity) {
            throw new HttpException(`MenuItem with ID ${data.Id} not found`, HttpStatus.NOT_FOUND);
        }
        return this.mapper.map(entity, MenuItemEntity, MenuItemResponseDto);
    }

    async createMenuItem(createDto: CreateMenuItemDto): Promise<MenuItemResponseDto> {
        const existingMenuItem = await this.menuItemRepository.findOne({
            where: { name: createDto.name },
        });
        if (existingMenuItem) {
            throw new HttpException('MenuItem with this name already exists', HttpStatus.CONFLICT);
        }
        const entity = this.mapper.map(createDto, CreateMenuItemDto, MenuItemEntity);
        const savedEntity = await this.menuItemRepository.save(entity);
        return this.mapper.map(savedEntity, MenuItemEntity, MenuItemResponseDto);
    }

    async updateMenuItem(params: IdParamDto, updateDto: CreateMenuItemDto): Promise<MenuItemResponseDto> {
        const entity = await this.menuItemRepository.findOne({
            where: { id: params.Id },
        });
        if (!entity) {
            throw new HttpException(`MenuItem with ID ${params.Id} not found`, HttpStatus.NOT_FOUND);
        }
        const existingMenuItem = await this.menuItemRepository.findOne({
            where: { name: updateDto.name, id: Not(params.Id) },
        });
        if (existingMenuItem) {
            throw new HttpException('MenuItem with this name already exists', HttpStatus.CONFLICT);
        }
        const updatedEntity = this.mapper.map(updateDto, CreateMenuItemDto, MenuItemEntity);
        updatedEntity.id = params.Id;
        await this.menuItemRepository.update(updatedEntity.id, updatedEntity);
        const menuItemResponse = await this.menuItemRepository.findOne({
            where: { id: params.Id },
            relations: ['category', 'orderItems'],
        });
        if (!menuItemResponse) {
            throw new HttpException(`Failed to retrieve updated menu item with ID ${params.Id}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this.mapper.map(menuItemResponse, MenuItemEntity, MenuItemResponseDto);
    }

    async deleteMenuItem(data: IdParamDto): Promise<void> {
        const entity = await this.menuItemRepository.findOne({
            where: { id: data.Id },
        });
        if (!entity) {
            throw new HttpException(`MenuItem with ID ${data.Id} not found`, HttpStatus.NOT_FOUND);
        }
        await this.menuItemRepository.softDelete(entity.id);
    }
}
