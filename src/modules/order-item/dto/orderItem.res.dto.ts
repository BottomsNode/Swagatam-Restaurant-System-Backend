import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "src/common/dto/base.res.dto";
import { MenuItemDto } from "src/modules/menu-item/dto/menuItem.dto";
import { OrderDto } from "src/modules/order/dto/order.dto";

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