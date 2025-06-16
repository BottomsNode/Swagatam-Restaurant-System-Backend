import { AutoMap } from "@automapper/classes";
import { OrderDto } from "src/order/dto/order.dto";
import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "src/common/dto/base.res.dto";

export class StaffResponseDto extends BaseResponseDto {

    @AutoMap()
    @ApiProperty()
    name: string;

    @AutoMap()
    @ApiProperty()
    role: string;

    @AutoMap()
    @ApiProperty()
    email: string;

    @AutoMap()
    @ApiProperty()
    orders?: OrderDto[];
}