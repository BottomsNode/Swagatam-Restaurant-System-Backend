import { BaseDto } from "@/common/dto/base.dto";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

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