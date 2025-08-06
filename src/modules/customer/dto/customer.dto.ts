import { BaseDto } from "@/common/dto/base.dto";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
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