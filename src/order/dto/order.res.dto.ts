import { AutoMap } from "@automapper/classes";
import { OrderDto } from "./order.dto";
import { CustomerDto } from "src/customer/dto/customer.dto";
import { TableDto } from "src/table/dto/table.dto";
import { StaffDto } from "src/staff/dto/staff.dto";
import { OrderItemResponseDto } from "src/order-item/dto/orderItem.res.dto";

export class OrderResponseDto extends OrderDto {
    
    @AutoMap()
    customer?: CustomerDto;

    @AutoMap()
    table?: TableDto;

    @AutoMap()
    staff?: StaffDto;

    @AutoMap()
    items?: OrderItemResponseDto[];
}