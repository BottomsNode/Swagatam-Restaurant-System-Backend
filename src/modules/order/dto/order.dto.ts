import { BaseDto } from "@/common/dto/base.dto";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

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