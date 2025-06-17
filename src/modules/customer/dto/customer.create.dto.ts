
import { AutoMap } from "@automapper/classes";
import { IsEmail, IsNotEmpty, IsPhoneNumber, ValidationArguments } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateCustomerDto {
    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: "Customer's email address",
        example: "12345XXXXX"
    })
    @AutoMap()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        description: 'Email address of the user',
        example: 'abcd@gmail.com',
    })
    @IsNotEmpty()
    @AutoMap()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    password: string;

}