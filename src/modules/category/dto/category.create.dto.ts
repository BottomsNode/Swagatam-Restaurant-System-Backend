import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, Length } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    @Length(3, 3, { message: 'Category must be exactly 3 characters long' })
    name: string;
}