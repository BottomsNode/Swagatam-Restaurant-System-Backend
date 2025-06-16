
import { AutoMap } from "@automapper/classes";
import { IsEmail, IsNotEmpty, IsPhoneNumber, ValidationArguments } from "@nestjs/class-validator";
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {
    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    @IsEmail()
    email: string;

}