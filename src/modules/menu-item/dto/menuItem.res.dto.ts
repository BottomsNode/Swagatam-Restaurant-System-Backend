import { BaseResponseDto } from '@/common/dto/base.res.dto';
import { CategoryDto } from '@/modules/category/dto/category.dto';
import { OrderItemDto } from '@/modules/order-item/dto/orderItem.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class MenuItemResponseDto extends BaseResponseDto {
  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  price: number;

  @AutoMap()
  @ApiProperty()
  description: string;

  @AutoMap()
  quantityAvailable: number;

  @AutoMap()
  @ApiProperty()
  category?: CategoryDto;

  @AutoMap()
  @ApiProperty()
  orderItems?: OrderItemDto[];
}
