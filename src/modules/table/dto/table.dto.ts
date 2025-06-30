
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "src/common/dto/base.dto";

export class TableDto extends BaseDto {
    @AutoMap()
    @ApiProperty()
    id: number;

    @AutoMap()
    status : string

    @AutoMap()
    @ApiProperty()
    tableNumber: number;
}