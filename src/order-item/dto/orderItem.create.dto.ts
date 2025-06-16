import { AutoMap } from "@automapper/classes";
import { IsNotEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateOrderItemDto {

    @IsInt()
    id: number;

    @AutoMap()
    @IsNotEmpty()
    @ApiProperty()
    priceAtOrder: number;

    @AutoMap()
    @IsInt({ message: 'Quantity must be an integer' })
    @IsNotEmpty()
    @ApiProperty()
    quantity: number;

    @AutoMap()
    @IsNotEmpty()
    @ApiProperty()
    menuItemId: number;
}