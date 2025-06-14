import { AutoMap } from "@automapper/classes";
import { StaffDto } from "./staff.dto";
import { OrderDto } from "src/order/dto/order.dto";

export class StaffResponseDto extends StaffDto {

    @AutoMap()
    orders?: OrderDto[];
}