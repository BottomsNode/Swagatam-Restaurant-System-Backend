import { AutoMap } from "@automapper/classes";
import { OrderDto } from "src/order/dto/order.dto";
import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "src/common/dto/base.res.dto";

export class TableResponseDto extends BaseResponseDto {

    @AutoMap()
    @ApiProperty()
    tableNumber: number;

    @AutoMap()
    status : string;

    @ApiProperty()
    @AutoMap()
    orders?: OrderDto[];
}
