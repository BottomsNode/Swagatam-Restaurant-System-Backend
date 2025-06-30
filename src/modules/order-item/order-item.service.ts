import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdParamDto } from 'src/common/dto/IdParam.dto';
import { Repository } from 'typeorm';
import { OrderItemResponseDto } from './dto/orderItem.res.dto';
import { OrderItemEntity } from './entities/order_item.entity';
import { CreateOrderItemDto } from './dto/orderItem.create.dto';

@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(OrderItemEntity) private readonly orderItemRepository: Repository<OrderItemEntity>,
        @InjectMapper() private readonly mapper: Mapper,
    ) { }

    async getAllOrderItem(): Promise<OrderItemResponseDto[]> {
        const entities = await this.orderItemRepository.find({
            relations: ['order', 'menuItem'],
            order: { id: 'ASC' },
        });
        if (!entities || entities.length === 0) {
            throw new HttpException('No order items found', HttpStatus.NOT_FOUND);
        }
        return this.mapper.mapArray(entities, OrderItemEntity, OrderItemResponseDto);
    }

    async getOrderItem(data: IdParamDto): Promise<OrderItemResponseDto> {
        const entity = await this.orderItemRepository.findOne({
            where: { id: data.Id },
            relations: ['order', 'menuItem'],
            order: { id: 'ASC' },
        });
        if (!entity) {
            throw new HttpException(`OrderItem with ID ${data.Id} not found`, HttpStatus.NOT_FOUND);
        }
        return this.mapper.map(entity, OrderItemEntity, OrderItemResponseDto);
    }

    async updateOrderItem(params: IdParamDto, updateDto: CreateOrderItemDto): Promise<OrderItemResponseDto> {
        const entity = await this.orderItemRepository.findOne({
            where: { id: params.Id },
        });
        if (!entity) {
            throw new HttpException(`OrderItem with ID ${params.Id} not found`, HttpStatus.NOT_FOUND);
        }
        const updatedEntity = this.mapper.map(updateDto, CreateOrderItemDto, OrderItemEntity);
        updatedEntity.id = params.Id;
        await this.orderItemRepository.update(updatedEntity.id, updatedEntity);
        const orderItemResponse = await this.orderItemRepository.findOne({
            where: { id: params.Id },
            relations: ['order', 'menuItem'],
        });
        if (!orderItemResponse) {
            throw new HttpException(`Failed to retrieve updated order item with ID ${params.Id}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this.mapper.map(orderItemResponse, OrderItemEntity, OrderItemResponseDto);
    }

    async deleteOrderItem(data: IdParamDto): Promise<void> {
        const entity = await this.orderItemRepository.findOne({
            where: { id: data.Id },
        });
        if (!entity) {
            throw new HttpException(`OrderItem with ID ${data.Id} not found`, HttpStatus.NOT_FOUND);
        }
        await this.orderItemRepository.softDelete(entity.id);
    }
}