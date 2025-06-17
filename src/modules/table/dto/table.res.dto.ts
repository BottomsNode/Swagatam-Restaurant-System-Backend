import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "src/common/dto/base.res.dto";
import { OrderDto } from "src/modules/order/dto/order.dto";

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
