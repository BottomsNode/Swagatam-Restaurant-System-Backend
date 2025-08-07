import { BaseResponseDto } from '@/common/dto/base.res.dto';
import { OrderDto } from '@/modules/order/dto/order.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class TableResponseDto extends BaseResponseDto {
  @AutoMap()
  @ApiProperty()
  tableNumber: number;

  @AutoMap()
  status: string;

  @ApiProperty()
  @AutoMap()
  orders?: OrderDto[];
}
