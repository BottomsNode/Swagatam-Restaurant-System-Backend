import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters } from '@nestjs/common';
import { IdParamDto } from 'src/common/dto/IdParam.dto';
import { CommonExceptionFilter } from 'src/common/error/exception.handler';
import { OrderItemResponseDto } from './dto/orderItem.res.dto';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/orderItem.create.dto';

@Controller('order-item')
@UseFilters(CommonExceptionFilter)
export class OrderItemController {
    constructor(private readonly orderItemService: OrderItemService) { }

    private async executeRoute(
        operation: 'getAll' | 'getOrderItem' | 'createOrderItem' | 'updateOrderItem' | 'deleteOrderItem',
        params?: IdParamDto | CreateOrderItemDto, body?: CreateOrderItemDto
    ) {
        switch (operation) {
            case 'getAll':
                return this.orderItemService.getAllOrderItem();
            case 'getOrderItem':
                return this.orderItemService.getOrderItem(params as IdParamDto);
            case 'updateOrderItem':
                return this.orderItemService.updateOrderItem(params as IdParamDto, body as CreateOrderItemDto);
            case 'deleteOrderItem':
                return this.orderItemService.deleteOrderItem(params as IdParamDto);
            default:
                throw new HttpException('Invalid operation', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/')
    async getAllOrderItem(): Promise<OrderItemResponseDto[]> {
        return this.executeRoute('getAll') as Promise<OrderItemResponseDto[]>;
    }

    @Get('/:Id')
    async getOrderItem(@Param() params: IdParamDto): Promise<OrderItemResponseDto> {
        return this.executeRoute('getOrderItem', params) as Promise<OrderItemResponseDto>;
    }

    // @Post('/')
    // async createOrderItem(@Body() createDto: CreateOrderItemDto): Promise<OrderItemResponseDto> {
    //     return this.orderItemService.createOrderItem(createDto);
    // }

    @Put('/:Id')
    async updateOrderItem(@Param() params: IdParamDto, @Body() updateDto: CreateOrderItemDto): Promise<OrderItemResponseDto> {
        return this.executeRoute('updateOrderItem', params, updateDto) as Promise<OrderItemResponseDto>;
    }

    // @Delete('/:Id')
    // async deleteOrderItem(@Param() params: IdParamDto): Promise<void> {
    //     return this.executeRoute('deleteOrderItem', params) as Promise<void>;
    // }
}