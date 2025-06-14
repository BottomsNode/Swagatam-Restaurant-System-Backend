import { AutoMap } from "@automapper/classes";

export class CreateOrderItemDto {
    @AutoMap()
    menuItemId: number;

    @AutoMap()
    quantity: number;

    @AutoMap()
    priceAtOrder: number;
}