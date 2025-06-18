import { SetMetadata } from "@nestjs/common";
import { STAFF_ROLES, USER_ROLES } from "../dto/all.roles.dto";

export const ROLES_KEY = 'sys_roles'
export const Roles = (...roles: [USER_ROLES, ...USER_ROLES[]]) => SetMetadata(ROLES_KEY, roles);
export const Staff_Roles = (...roles: [STAFF_ROLES, ...STAFF_ROLES[]]) => SetMetadata(ROLES_KEY, roles);
