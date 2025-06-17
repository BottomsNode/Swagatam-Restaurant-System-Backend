import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, Length } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMenuItemDto {
    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    @Length(3, 3, { message: 'Menu Item must be exactly 3 characters long' })
    name: string;

    @AutoMap()
    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @AutoMap()
    @IsNotEmpty()
    @ApiProperty()
    description?: string;

    @AutoMap()
    @IsNotEmpty()
    @ApiProperty()
    categoryId: number;
}