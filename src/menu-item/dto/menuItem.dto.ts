import { AutoMap } from "@automapper/classes";

export class MenuItemDto {
    @AutoMap()
    id: number;

    @AutoMap()
    name: string;

    @AutoMap()
    price: number;

    @AutoMap()
    description: string;    
}