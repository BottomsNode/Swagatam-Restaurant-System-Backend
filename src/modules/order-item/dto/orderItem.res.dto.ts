import { BaseResponseDto } from "@/common/dto/base.res.dto";
import { MenuItemDto } from "@/modules/menu-item/dto/menuItem.dto";
import { OrderDto } from "@/modules/order/dto/order.dto";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";


export class OrderItemResponseDto extends BaseResponseDto {

    @AutoMap()
    @ApiProperty()
    quantity: number;

    @AutoMap()
    @ApiProperty()
    priceAtOrder: number;

    @AutoMap()
    order?: OrderDto;

    @AutoMap()
    menuItem?: MenuItemDto;
}