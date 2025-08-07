import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrderItemResponseDto } from './dto/orderItem.res.dto';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/orderItem.create.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SystemRoleGuard } from '../auth/guards/sys-role.guard';
import { Roles } from '../auth/decorators/sys.role.decorators';
import { USER_ROLES } from '../auth/dto/all.roles.dto';
import { IdParamDto } from '@/common/dto/IdParam.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@UseGuards(SystemRoleGuard)
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  private async executeRoute(
    operation:
      | 'getAll'
      | 'getOrderItem'
      | 'createOrderItem'
      | 'updateOrderItem'
      | 'deleteOrderItem',
    params?: IdParamDto | CreateOrderItemDto,
    body?: CreateOrderItemDto,
  ) {
    switch (operation) {
      case 'getAll':
        return this.orderItemService.getAllOrderItem();
      case 'getOrderItem':
        return this.orderItemService.getOrderItem(params as IdParamDto);
      case 'updateOrderItem':
        return this.orderItemService.updateOrderItem(
          params as IdParamDto,
          body,
        );
      case 'deleteOrderItem':
        return this.orderItemService.deleteOrderItem(params as IdParamDto);
      default:
        throw new HttpException('Invalid operation', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/')
  @Roles(USER_ROLES.ADMIN, USER_ROLES.CUSTOMER)
  async getAllOrderItem(): Promise<OrderItemResponseDto[]> {
    return this.executeRoute('getAll') as Promise<OrderItemResponseDto[]>;
  }

  @Get('/:Id')
  @Roles(USER_ROLES.ADMIN, USER_ROLES.CUSTOMER)
  async getOrderItem(
    @Param() params: IdParamDto,
  ): Promise<OrderItemResponseDto> {
    return this.executeRoute(
      'getOrderItem',
      params,
    ) as Promise<OrderItemResponseDto>;
  }

  @Put('/:Id')
  @Roles(USER_ROLES.CUSTOMER)
  async updateOrderItem(
    @Param() params: IdParamDto,
    @Body() updateDto: CreateOrderItemDto,
  ): Promise<OrderItemResponseDto> {
    return this.executeRoute(
      'updateOrderItem',
      params,
      updateDto,
    ) as Promise<OrderItemResponseDto>;
  }

  @Delete('/:Id')
  @Roles(USER_ROLES.ADMIN)
  async deleteOrderItem(@Param() params: IdParamDto): Promise<void> {
    return this.executeRoute('deleteOrderItem', params) as Promise<void>;
  }
}
