
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "src/common/dto/base.res.dto";
import { CategoryDto } from "src/modules/category/dto/category.dto";
import { OrderItemDto } from "src/modules/order-item/dto/orderItem.dto";

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
