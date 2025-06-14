import { MenuItemDto } from "src/menu-item/dto/menuItem.dto";
import { CategoryDto } from "./category.dto";
import { AutoMap } from "@automapper/classes";

export class CategoryResponseDto extends CategoryDto {
    @AutoMap()
    menuItems?: MenuItemDto[];
}