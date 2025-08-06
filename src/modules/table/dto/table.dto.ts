
import { BaseDto } from "@/common/dto/base.dto";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

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