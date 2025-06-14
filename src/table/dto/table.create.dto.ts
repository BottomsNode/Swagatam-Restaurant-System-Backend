import { AutoMap } from "@automapper/classes";

export class CreateTableDto {
    @AutoMap()
    tableNumber: number;

}