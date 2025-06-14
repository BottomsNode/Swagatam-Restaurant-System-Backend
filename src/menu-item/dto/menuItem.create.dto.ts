import { AutoMap } from "@automapper/classes";

export class CreateMenuItemDto {
    @AutoMap()
    name: string;

    @AutoMap()
    price: number;

    @AutoMap()
    description?: string;

    @AutoMap()
    categoryId: number;
}