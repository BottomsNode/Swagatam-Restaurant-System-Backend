import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "src/common/dto/base.dto";

export class CategoryDto extends BaseDto{
    @AutoMap()
    @ApiProperty()
    id: number;

    @ApiProperty()
    @AutoMap()
    name: string;
}