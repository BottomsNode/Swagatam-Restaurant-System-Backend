import { AutoMap } from "@automapper/classes";

export class CreateStaffDto {
    @AutoMap()
    name: string;

    @AutoMap()
    role: string;

    @AutoMap()
    email: string;

}