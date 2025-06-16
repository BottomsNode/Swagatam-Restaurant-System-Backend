import { AutoMap } from "@automapper/classes";

export class BaseDto {
    @AutoMap()
    isActive: boolean;

    @AutoMap()
    createdAt: Date;

    @AutoMap()
    updatedAt: Date;

    @AutoMap()
    deletedAt: Date | null;
}