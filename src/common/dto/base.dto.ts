import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { USER_ROLES } from "src/modules/auth/dto/all.roles.dto";

export class BaseDto {
    @AutoMap()
    isActive: boolean;

    @AutoMap()
    createdAt: Date;

    @AutoMap()
    updatedAt: Date;

    @AutoMap()
    deletedAt: Date | null;

    @ApiProperty()
    @AutoMap()
    role?: USER_ROLES;
}