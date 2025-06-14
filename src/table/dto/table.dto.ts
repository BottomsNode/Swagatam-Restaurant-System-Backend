
import { AutoMap } from "@automapper/classes";

export class TableDto {
    @AutoMap()
    id: number;

    @AutoMap()
    tableNumber: number;
}