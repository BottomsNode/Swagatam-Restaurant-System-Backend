import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginCustomerDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'Mahesh@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password in plain text',
    example: 'Mahesh',
  })
  @IsNotEmpty()
  password: string;
}
