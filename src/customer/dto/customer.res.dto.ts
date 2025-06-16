import { AutoMap } from "@automapper/classes";
import { OrderDto } from "src/order/dto/order.dto";
import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "src/common/dto/base.res.dto";

export class CustomerResponseDto extends BaseResponseDto {

    @AutoMap()
    @ApiProperty()
    name: string;

    @AutoMap()
    @ApiProperty()
    phone: string;

    @ApiProperty()
    @AutoMap()
    email: string;

    @ApiProperty()
    @AutoMap()
    orders?: OrderDto[];

}