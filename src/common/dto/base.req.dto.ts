import { AutoMap } from "@automapper/classes";

export abstract class BaseCreateDto {
    @AutoMap()
    isActive?: boolean;
}