import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "src/common/dto/base.dto";
export class CustomerDto extends BaseDto {

    @ApiProperty()
    @AutoMap()
    id: number;

    @AutoMap()
    @ApiProperty()
    name: string;

    @AutoMap()
    @ApiProperty()
    phone: string;

    @ApiProperty()
    @AutoMap()
    email: string;

}