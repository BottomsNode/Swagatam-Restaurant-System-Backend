import { AutoMap } from "@automapper/classes";
import { CustomerResponseDto } from "src/modules/customer/dto/customer.res.dto";

export class LoginResponseDto {
    @AutoMap()
    accessToken: string;
    @AutoMap()
    customer: CustomerResponseDto;
}