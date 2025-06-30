import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, ValidateNested } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateOrderItemDto } from "src/modules/order-item/dto/orderItem.create.dto";

export class CreateOrderDto {

    @AutoMap()
    @IsNotEmpty()
    @ApiProperty()
    customerId: number;

    @AutoMap()
    @IsNotEmpty()
    @ApiProperty()
    tableId: number;

    @AutoMap()
    @IsNotEmpty()
    @ApiProperty()
    staffId: number;

    @ApiProperty({ type: [CreateOrderItemDto], required: true })
    @ValidateNested({ each: true })
    @AutoMap(() => [CreateOrderItemDto])
    items: CreateOrderItemDto[];
}