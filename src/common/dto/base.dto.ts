import { USER_ROLES } from "@/modules/auth/dto/all.roles.dto";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

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