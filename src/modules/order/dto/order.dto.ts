import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "src/common/dto/base.dto";

export class OrderDto extends BaseDto {
    @AutoMap()
    @ApiProperty()
    id: number;

    @AutoMap()
    @ApiProperty()
    orderTime: Date;

    @AutoMap()
    @ApiProperty()
    totalAmount: number;

    @AutoMap()
    @ApiProperty()
    status: string;
}