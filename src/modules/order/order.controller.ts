import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { CommonExceptionFilter } from 'src/common/error/exception.handler';
import { OrderService } from './order.service';
import { IdParamDto } from 'src/common/dto/IdParam.dto';
import { OrderResponseDto } from './dto/order.res.dto';
import { CreateOrderDto } from './dto/order.create.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('order')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@UseFilters(CommonExceptionFilter)
export class OrderController {

    constructor(private readonly orderService: OrderService) { }

    private async executeRoute(
        operation: 'getAll' | 'getOrder' | 'createOrder' | 'updateOrder' | 'deleteOrder',
        params?: IdParamDto, body?: CreateOrderDto
    ) {
        switch (operation) {
            case 'getAll':
                return this.orderService.getAllOrder();
            case 'getOrder':
                return this.orderService.getOrder(params as IdParamDto);
            case 'updateOrder':
                return this.orderService.updateOrder(params as IdParamDto, body as CreateOrderDto);
            case 'deleteOrder':
                return this.orderService.deleteOrder(params as IdParamDto);
            default:
                throw new HttpException('Invalid operation', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/')
    async getAllOrder(): Promise<OrderResponseDto[]> {
        return this.executeRoute('getAll') as Promise<OrderResponseDto[]>;
    }

    @Get('/:Id')
    async getOrder(@Param() params: IdParamDto): Promise<OrderResponseDto> {
        return this.executeRoute('getOrder', params) as Promise<OrderResponseDto>;
    }

    @Post('/')
    async createOrder(@Body() createDto: CreateOrderDto): Promise<OrderResponseDto> {
        return this.orderService.createOrder(createDto as CreateOrderDto);
    }

    @Put('/:Id')
    async updateOrder(@Param() params: IdParamDto, @Body() updateDto: CreateOrderDto): Promise<OrderResponseDto> {
        return this.executeRoute('updateOrder', params, updateDto) as Promise<OrderResponseDto>;
    }

    @Delete('/:Id')
    async deleteOrder(@Param() params: IdParamDto): Promise<void> {
        return this.executeRoute('deleteOrder', params) as Promise<void>;
    }
}