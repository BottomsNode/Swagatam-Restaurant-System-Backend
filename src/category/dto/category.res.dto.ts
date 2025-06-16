import { MenuItemDto } from "src/menu-item/dto/menuItem.dto";
import { CategoryDto } from "./category.dto";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "src/common/dto/base.res.dto";

export class CategoryResponseDto extends BaseResponseDto {

    @ApiProperty()
    @AutoMap()
    name: string;

    @AutoMap()
    @ApiProperty()
    menuItems?: MenuItemDto[];
}