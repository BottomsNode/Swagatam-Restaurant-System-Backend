import { AutoMap } from "@automapper/classes";
import { TableDto } from "./table.dto";
import { OrderDto } from "src/order/dto/order.dto";

export class TableResponseDto extends TableDto {

    @AutoMap()
    orders?: OrderDto[];
}
