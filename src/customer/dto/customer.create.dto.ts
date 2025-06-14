
import { AutoMap } from "@automapper/classes";

export class CreateCustomerDto {
    @AutoMap()
    name: string;

    @AutoMap()
    phone: string;

    @AutoMap()
    email: string;

}