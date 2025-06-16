import { AutoMap } from "@automapper/classes";
import { OrderDto } from "./order.dto";
import { CustomerDto } from "src/customer/dto/customer.dto";
import { TableDto } from "src/table/dto/table.dto";
import { StaffDto } from "src/staff/dto/staff.dto";
import { OrderItemResponseDto } from "src/order-item/dto/orderItem.res.dto";
import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "src/common/dto/base.res.dto";

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