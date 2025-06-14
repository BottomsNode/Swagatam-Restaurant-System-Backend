import { AutoMap } from "@automapper/classes";

export class OrderDto{
    @AutoMap()
    id: number;

    @AutoMap()
    orderTime: Date;

    @AutoMap()
    totalAmount: number;

    @AutoMap()
    status: string;
}