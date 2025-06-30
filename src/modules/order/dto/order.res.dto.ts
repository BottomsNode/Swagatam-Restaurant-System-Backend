import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "src/common/dto/base.res.dto";
import { OrderItemResponseDto } from "src/modules/order-item/dto/orderItem.res.dto";

export class OrderResponseDto extends BaseResponseDto {

    @AutoMap()
    @ApiProperty()
    orderTime: Date;

    @AutoMap()
    @ApiProperty()
    totalAmount: number;

    @AutoMap()
    @ApiProperty()
    status: string;
    
    @ApiProperty()
    @AutoMap()
    // customer?: CustomerDto;
    customer: { id: number };

    @AutoMap()
    @ApiProperty()
    // table?: TableDto;
    table: { id: number };

    @AutoMap()
    @ApiProperty()
    // staff?: StaffDto;
    staff: { id: number };

    @AutoMap()
    @ApiProperty()
    items?: OrderItemResponseDto[];
}