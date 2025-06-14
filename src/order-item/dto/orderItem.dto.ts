import { AutoMap } from "@automapper/classes";

export class OrderItemDto {
    @AutoMap()
    id: number;

    @AutoMap()
    quantity: number;

    @AutoMap()
    priceAtOrder: number;

}