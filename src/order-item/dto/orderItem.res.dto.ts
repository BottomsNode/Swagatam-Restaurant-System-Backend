import { AutoMap } from "@automapper/classes";
import { OrderItemDto } from "./orderItem.dto";
import { OrderDto } from "src/order/dto/order.dto";
import { MenuItemDto } from "src/menu-item/dto/menuItem.dto";
import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "src/common/dto/base.res.dto";

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