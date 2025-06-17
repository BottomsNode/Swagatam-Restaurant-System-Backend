import { AutoMap } from "@automapper/classes";
import { IsNotEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMenuItemDto {
    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
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