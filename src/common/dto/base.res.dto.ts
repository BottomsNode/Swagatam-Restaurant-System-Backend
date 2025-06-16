import { AutoMap } from "@automapper/classes";

export abstract class BaseResponseDto {
    @AutoMap()
    id: number;

    @AutoMap()
    isActive: boolean;

    @AutoMap()
    createdAt?: Date;
}