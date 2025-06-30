import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { USER_ROLES } from "src/modules/auth/dto/all.roles.dto";

export abstract class BaseResponseDto {
    @AutoMap()
    id: number;

    @AutoMap()
    isActive: boolean;

    @AutoMap()
    @ApiProperty()
    role: USER_ROLES

    @AutoMap()
    createdAt?: Date;
}