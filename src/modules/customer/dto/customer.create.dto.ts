
import { AutoMap } from "@automapper/classes";
import { IsEmail, IsNotEmpty, IsPhoneNumber, ValidationArguments } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, Matches, MinLength } from "class-validator";

export class CreateCustomerDto {
    @ApiProperty({
        description: "Customer's name, exactly 3 alphabetical characters (no numbers or symbols)",
        example: "abc",
    })
    @AutoMap()
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @Length(3, 3, { message: 'Name must be exactly 3 characters long' })
    @Matches(/^[a-zA-Z]{3}$/, { message: 'Name must contain only alphabetical characters' })
    name: string;

    @ApiProperty({
        description: "Customer's Indian phone number",
        example: "+9198754XXXXX",
    })
    @AutoMap()
    @IsNotEmpty({ message: 'Phone number cannot be empty' })
    @Matches(/^(?:\+91)?[6-9]\d{9}$/, { message: 'Invalid Indian phone number format' })
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