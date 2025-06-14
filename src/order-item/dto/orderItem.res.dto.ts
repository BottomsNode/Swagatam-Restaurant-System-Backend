import { AutoMap } from "@automapper/classes";
import { OrderItemDto } from "./orderItem.dto";
import { OrderDto } from "src/order/dto/order.dto";
import { MenuItemDto } from "src/menu-item/dto/menuItem.dto";

export class OrderItemResponseDto extends OrderItemDto {
    @AutoMap()
    order?: OrderDto;

    @AutoMap()
    menuItem?: MenuItemDto;
}