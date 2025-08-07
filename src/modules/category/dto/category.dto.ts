import { BaseDto } from '@/common/dto/base.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto extends BaseDto {
  @AutoMap()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @AutoMap()
  name: string;
}
