import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "src/common/dto/base.res.dto";
import { OrderDto } from "src/modules/order/dto/order.dto";

export class StaffResponseDto extends BaseResponseDto {

    @AutoMap()
    @ApiProperty()
    name: string;

    @AutoMap()
    @ApiProperty()
    email: string;

    @AutoMap()
    @ApiProperty()
    orders?: OrderDto[];
}