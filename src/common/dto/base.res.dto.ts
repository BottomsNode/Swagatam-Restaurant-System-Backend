import { USER_ROLES } from '@/modules/auth/dto/all.roles.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseResponseDto {
  @AutoMap()
  id: number;

  @AutoMap()
  isActive: boolean;

  @AutoMap()
  @ApiProperty()
  role: USER_ROLES;

  @AutoMap()
  createdAt?: Date;
}
