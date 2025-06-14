import { AutoMap } from "@automapper/classes";

export class CustomerDto {
    @AutoMap()
    id: number;

    @AutoMap()
    name: string;

    @AutoMap()
    phone: string;

    @AutoMap()
    email: string;

}