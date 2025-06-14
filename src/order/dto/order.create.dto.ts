import { AutoMap } from "@automapper/classes";
import { CreateOrderItemDto } from "src/order-item/dto/orderItem.create.dto";
import { OrderItemDto } from "src/order-item/dto/orderItem.dto";

export class CreateOrderDto {

    @AutoMap()
    customerId: number;

    @AutoMap()
    tableId: number;

    @AutoMap()
    staffId: number;

    @AutoMap(() => [OrderItemDto])
    items: CreateOrderItemDto[];
}