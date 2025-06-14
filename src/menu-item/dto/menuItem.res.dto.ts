
import { AutoMap } from "@automapper/classes";
import { CategoryDto } from "src/category/dto/category.dto";
import { OrderItemDto } from "src/order-item/dto/orderItem.dto";
import { MenuItemDto } from "./menuItem.dto";

export class MenuItemResponseDto extends MenuItemDto {
    @AutoMap()
    category?: CategoryDto;
    @AutoMap()
    orderItems?: OrderItemDto[];
}
