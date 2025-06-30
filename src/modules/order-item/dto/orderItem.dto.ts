import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "src/common/dto/base.dto";

export class OrderItemDto extends BaseDto{
    @AutoMap()
    @ApiProperty()
    id: number;

    @AutoMap()
    @ApiProperty()
    quantity: number;

    @AutoMap()
    @ApiProperty()
    priceAtOrder: number;

}