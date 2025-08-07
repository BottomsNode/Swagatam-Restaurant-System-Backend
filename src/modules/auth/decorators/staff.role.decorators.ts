import { SetMetadata } from '@nestjs/common';
import { STAFF_ROLES } from '../dto/all.roles.dto';

export const ROLES_KEY = 'staff_roles';
export const Staff_Roles = (...roles: [STAFF_ROLES, ...STAFF_ROLES[]]) =>
  SetMetadata(ROLES_KEY, roles);
