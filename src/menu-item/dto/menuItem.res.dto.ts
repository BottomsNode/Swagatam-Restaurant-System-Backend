
import { AutoMap } from "@automapper/classes";
import { CategoryDto } from "src/category/dto/category.dto";
import { OrderItemDto } from "src/order-item/dto/orderItem.dto";
import { MenuItemDto } from "./menuItem.dto";
import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "src/common/dto/base.res.dto";

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
