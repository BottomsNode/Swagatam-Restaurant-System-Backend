import { AutoMap } from '@automapper/classes';
import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description:
      "Customer's name, exactly 3 alphabetical characters (no numbers or symbols)",
    example: 'abc',
  })
  @AutoMap()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @Length(3)
  name: string;

  @ApiProperty({
    description: "Customer's Indian phone number",
    example: '+9198754XXXXX',
  })
  @AutoMap()
  @IsNotEmpty({ message: 'Phone number cannot be empty' })
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
