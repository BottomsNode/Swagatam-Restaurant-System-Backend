import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResponseDto } from './dto/order.res.dto';
import { CreateOrderDto } from './dto/order.create.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/sys.role.decorators';
import { USER_ROLES } from '../auth/dto/all.roles.dto';
import { SystemRoleGuard } from '../auth/guards/sys-role.guard';
import { IdParamDto } from '@/common/dto/IdParam.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@UseGuards(SystemRoleGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  private async executeRoute(
    operation:
      | 'getAll'
      | 'getOrder'
      | 'createOrder'
      | 'updateOrder'
      | 'deleteOrder',
    params?: IdParamDto,
    body?: CreateOrderDto,
  ) {
    switch (operation) {
      case 'getAll':
        return this.orderService.getAllOrder();
      case 'getOrder':
        return this.orderService.getOrder(params);
      case 'updateOrder':
        return this.orderService.updateOrder(params, body);
      case 'deleteOrder':
        return this.orderService.deleteOrder(params);
      default:
        throw new HttpException('Invalid operation', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/')
  @Roles(USER_ROLES.ADMIN, USER_ROLES.CUSTOMER)
  async getAllOrder(): Promise<OrderResponseDto[]> {
    return this.executeRoute('getAll') as Promise<OrderResponseDto[]>;
  }

  @Get('/:Id')
  @Roles(USER_ROLES.CUSTOMER)
  async getOrder(@Param() params: IdParamDto): Promise<OrderResponseDto> {
    return this.executeRoute('getOrder', params) as Promise<OrderResponseDto>;
  }

  @Post('/')
  @Roles(USER_ROLES.ADMIN)
  async createOrder(
    @Body() createDto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    return this.orderService.createOrder(createDto);
  }

  @Put('/:Id')
  @Roles(USER_ROLES.ADMIN)
  async updateOrder(
    @Param() params: IdParamDto,
    @Body() updateDto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    return this.executeRoute(
      'updateOrder',
      params,
      updateDto,
    ) as Promise<OrderResponseDto>;
  }

  @Delete('/:Id')
  @Roles(USER_ROLES.ADMIN)
  async deleteOrder(@Param() params: IdParamDto): Promise<void> {
    return this.executeRoute('deleteOrder', params) as Promise<void>;
  }
}
