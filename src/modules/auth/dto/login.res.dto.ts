import { CustomerResponseDto } from "@/modules/customer/dto/customer.res.dto";
import { AutoMap } from "@automapper/classes";

export class LoginResponseDto {
    @AutoMap()
    accessToken: string;
    @AutoMap()
    customer: CustomerResponseDto;
}