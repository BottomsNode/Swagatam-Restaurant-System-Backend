import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStaffDto {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty()
  role: string;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
