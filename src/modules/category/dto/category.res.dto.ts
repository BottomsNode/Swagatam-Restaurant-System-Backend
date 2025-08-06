import { BaseResponseDto } from "@/common/dto/base.res.dto";
import { MenuItemDto } from "@/modules/menu-item/dto/menuItem.dto";
import { CategoryDto } from "./category.dto";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class CategoryResponseDto extends BaseResponseDto {

    @ApiProperty()
    @AutoMap()
    name: string;

    @AutoMap()
    @ApiProperty()
    menuItems?: MenuItemDto[];
}