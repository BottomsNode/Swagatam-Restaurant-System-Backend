import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdParamDto } from 'src/common/dto/IdParam.dto';
import { EntityManager, Repository } from 'typeorm';
import { OrderResponseDto } from './dto/order.res.dto';
import { OrderEntity, OrderStatus } from './entities/order.entity';
import { CreateOrderDto } from './dto/order.create.dto';
import { TableEntity, TableStatus } from 'src/table/entities/table.entity';
import { MenuItemEntity } from 'src/menu-item/entities/menu_item.entity';
import { CustomerEntity } from 'src/customer/entities/customer.entity';
import { OrderItemEntity } from 'src/order-item/entities/order_item.entity';
import { StaffEntity } from 'src/staff/entities/staff..entity';
import { CreateOrderItemDto } from 'src/order-item/dto/orderItem.create.dto';

@Injectable()
export class OrderService {

    private readonly logger = new Logger(OrderService.name);

    constructor(
        @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(OrderEntity) private readonly tableRepository: Repository<TableEntity>,
        @InjectRepository(OrderEntity) private readonly menuItemRepository: Repository<MenuItemEntity>,
        @InjectMapper() private readonly mapper: Mapper,
    ) { }

    async getAllOrder(): Promise<OrderResponseDto[]> {
        const entities = await this.orderRepository.find({
            relations: ['customer', 'table', 'staff', 'items'],
            order: { id: 'ASC' },
        });
        if (!entities || entities.length === 0) {
            throw new HttpException('No orders found', HttpStatus.NOT_FOUND);
        }
        return this.mapper.mapArray(entities, OrderEntity, OrderResponseDto);
    }

    async getOrder(data: IdParamDto): Promise<OrderResponseDto> {
        const entity = await this.orderRepository.findOne({
            where: { id: data.Id },
            relations: ['customer', 'table', 'staff', 'items', 'items.menuItem', 'items.menuItem.category'],
            order: { id: 'ASC' },
        });
        if (!entity) {
            throw new HttpException(`Order with ID ${data.Id} not found`, HttpStatus.NOT_FOUND);
        }
        return this.mapper.map(entity, OrderEntity, OrderResponseDto);
    }

    async createOrder(createDto: CreateOrderDto): Promise<OrderResponseDto> {
        return await this.orderRepository.manager.transaction(async (manager) => {
            try {
                // Create order entity using AutoMapper and validate table
                const entity = await this.createOrderEntity(createDto, manager);

                // Map order items and set order relation
                entity.items = this.mapOrderItems(createDto, entity);

                // Validate and update menu item quantities
                await this.validateAndUpdateMenuItems(entity.items, manager);

                // Save the order (cascades to order items)
                const savedEntity = await manager.save(OrderEntity, entity);
                this.logger.log(`Order saved: ${savedEntity.id}`);

                // Schedule status update for order and table
                this.scheduleStatusUpdate(savedEntity.id, createDto.tableId, manager);

                // Map to response DTO
                return this.mapper.map(savedEntity, OrderEntity, OrderResponseDto);
            } catch (error) {
                this.logger.error(`Error creating order: ${error.message}`);
                throw error instanceof BadRequestException || error instanceof NotFoundException
                    ? error
                    : new BadRequestException(`Failed to create order: ${error.message}`);
            }
        });
    }

    async updateOrder(params: IdParamDto, updateDto: CreateOrderDto): Promise<OrderResponseDto> {
        const entity = await this.orderRepository.findOne({
            where: { id: params.Id },
        });
        if (!entity) {
            throw new HttpException(`Order with ID ${params.Id} not found`, HttpStatus.NOT_FOUND);
        }
        const updatedEntity = this.mapper.map(updateDto, CreateOrderDto, OrderEntity);
        updatedEntity.id = params.Id;
        await this.orderRepository.update(updatedEntity.id, updatedEntity);
        const orderResponse = await this.orderRepository.findOne({
            where: { id: params.Id },
            relations: ['customer', 'table', 'staff', 'items'],
        });
        if (!orderResponse) {
            throw new HttpException(`Failed to retrieve updated order with ID ${params.Id}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this.mapper.map(orderResponse, OrderEntity, OrderResponseDto);
    }

    async deleteOrder(data: IdParamDto): Promise<void> {
        const entity = await this.orderRepository.findOne({
            where: { id: data.Id },
        });
        if (!entity) {
            throw new HttpException(`Order with ID ${data.Id} not found`, HttpStatus.NOT_FOUND);
        }
        await this.orderRepository.softDelete(entity.id);;
    }


    /**
      * Creates an OrderEntity from CreateOrderDto using AutoMapper
      */
    private async createOrderEntity(createDto: CreateOrderDto, manager: EntityManager): Promise<OrderEntity> {
        const entity = this.mapper.map(createDto, CreateOrderDto, OrderEntity);
        entity.orderTime = new Date();
        entity.status = OrderStatus.IN_PROCESS;
        entity.totalAmount = createDto.items.reduce((total, item) => {
            return total + (item.priceAtOrder * item.quantity);
        }, 0);

        // Validate and set table
        const table = await manager.findOne(TableEntity, { where: { id: createDto.tableId } });
        if (!table) {
            throw new NotFoundException(`Table with ID ${createDto.tableId} not found.`);
        }
        if (table.status === TableStatus.OCCUPIED) {
            throw new BadRequestException(`Table ${table.id} is currently occupied.`);
        }
        table.status = TableStatus.OCCUPIED;
        await manager.save(TableEntity, table);
        entity.table = table;

        return entity;
    }

    /**
     * Maps order items from DTO and sets order relation
     */
    private mapOrderItems(createDto: CreateOrderDto, order: OrderEntity): OrderItemEntity[] {
        const items = createDto.items.map(itemDto =>
            this.mapper.map(itemDto, CreateOrderItemDto, OrderItemEntity),
        );
        // Explicitly set order relation to ensure orderId is passed
        items.forEach(item => {
            item.order = order;
        });
        return items;
    }

    /**
     * Validates and updates menu item quantities
     */
    private async validateAndUpdateMenuItems(
        items: OrderItemEntity[],
        manager: EntityManager,
    ): Promise<void> {
        for (const item of items) {
            const menuItem = await manager.findOne(MenuItemEntity, {
                where: { id: item.menuItem.id },
            });
            if (!menuItem) {
                throw new NotFoundException(`Menu item with ID ${item.menuItem.id} not found.`);
            }
            if (menuItem.quantityAvailable < item.quantity) {
                throw new BadRequestException(
                    `Not enough quantity available for menu item ${menuItem.name}. Available: ${menuItem.quantityAvailable}, Requested: ${item.quantity}`,
                );
            }
            menuItem.quantityAvailable -= item.quantity;
            await manager.save(MenuItemEntity, menuItem);
        }
    }

    /**
     * Schedules order and table status update after 1 minute
     */
    private scheduleStatusUpdate(orderId: number, tableId: number, manager: EntityManager): void {
        setTimeout(async () => {
            try {
                await manager.transaction(async (innerManager) => {
                    const freshTable = await innerManager.findOne(TableEntity, { where: { id: tableId } });
                    if (freshTable) {
                        freshTable.status = TableStatus.AVAILABLE;
                        await innerManager.save(TableEntity, freshTable);
                        this.logger.log(`Table ${freshTable.id} status reset to AVAILABLE`);
                    } else {
                        this.logger.error(`Table ${tableId} not found during reset`);
                    }

                    const freshOrder = await innerManager.findOne(OrderEntity, {
                        where: { id: orderId },
                        relations: ['items'],
                    });
                    if (freshOrder) {
                        freshOrder.status = OrderStatus.COMPLETED;
                        await innerManager.save(OrderEntity, freshOrder);
                        this.logger.log(`Order ${freshOrder.id} status updated to COMPLETED`);
                    } else {
                        this.logger.error(`Order ${orderId} not found during status update`);
                    }
                });
            } catch (resetError) {
                this.logger.error(`Error during scheduled status reset: ${resetError.message}`);
            }
        }, 1 * 60 * 1000); // 1 minute delay
    }
}