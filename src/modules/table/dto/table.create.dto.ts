import { AutoMap } from "@automapper/classes";
import { IsNotEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTableDto {
    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    tableNumber: number;

}