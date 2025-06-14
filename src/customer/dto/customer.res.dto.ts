import { AutoMap } from "@automapper/classes";
import { CustomerDto } from "./customer.dto";
import { OrderDto } from "src/order/dto/order.dto";

export class CustomerResponseDto extends CustomerDto {
    @AutoMap()
    orders?: OrderDto[];
}