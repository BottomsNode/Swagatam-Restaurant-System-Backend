import { AutoMap } from "@automapper/classes";

export class StaffDto {
    @AutoMap()
    id: number;

    @AutoMap()
    name: string;

    @AutoMap()
    role: string;

    @AutoMap()
    email: string;
}