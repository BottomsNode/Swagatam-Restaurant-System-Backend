import { BaseResponseDto } from '@/common/dto/base.res.dto';
import { OrderDto } from '@/modules/order/dto/order.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class StaffResponseDto extends BaseResponseDto {
  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  email: string;

  @AutoMap()
  @ApiProperty()
  orders?: OrderDto[];
}
