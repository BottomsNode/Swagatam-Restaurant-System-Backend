import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { IdParamDto } from 'src/common/dto/IdParam.dto';
import { MenuItemResponseDto } from './dto/menuItem.res.dto';
import { MenuItemService } from './menu-item.service';
import { CreateMenuItemDto } from './dto/menuItem.create.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SystemRoleGuard } from '../auth/guards/sys-role.guard';
import { Roles } from '../auth/decorators/sys.role.decorators';
import { USER_ROLES } from '../auth/dto/all.roles.dto';
// import { RpcGlobalExceptionFilter } from 'src/common/base-db-ops/filters';

@ApiBearerAuth()
@UseGuards(SystemRoleGuard)
// @UseFilters(RpcGlobalExceptionFilter)
@Controller('menu-item')
export class MenuItemController {
    constructor(private readonly menuItemService: MenuItemService) { }

    private async executeRoute(
        operation: 'getAll' | 'getMenuItem' | 'updateMenuItem' | 'deleteMenuItem',
        params?: IdParamDto | CreateMenuItemDto, body?: CreateMenuItemDto
    ) {
        switch (operation) {
            case 'getAll':
                return this.menuItemService.getAllMenuItem();
            case 'getMenuItem':
                return this.menuItemService.getMenuItem(params as IdParamDto);
            case 'updateMenuItem':
                return this.menuItemService.updateMenuItem(params as IdParamDto, body as CreateMenuItemDto);
            case 'deleteMenuItem':
                return this.menuItemService.deleteMenuItem(params as IdParamDto);
            default:
                throw new HttpException('Invalid operation', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/')
    @Roles(USER_ROLES.ADMIN,USER_ROLES.CUSTOMER)
    async getAllMenuItem(): Promise<MenuItemResponseDto[]> {
        return this.executeRoute('getAll') as Promise<MenuItemResponseDto[]>;
    }

    @Get('/:Id')
    @Roles(USER_ROLES.ADMIN,USER_ROLES.CUSTOMER)
    async getMenuItem(@Param() params: IdParamDto): Promise<MenuItemResponseDto> {
        return this.executeRoute('getMenuItem', params) as Promise<MenuItemResponseDto>;
    }

    @Post('/')
    @Roles(USER_ROLES.ADMIN)
    async createMenuItem(@Body() createDto: CreateMenuItemDto): Promise<MenuItemResponseDto> {
        return this.menuItemService.createMenuItem(createDto);
    }

    @Put('/:Id')
    @Roles(USER_ROLES.ADMIN)
    async updateMenuItem(@Param() params: IdParamDto, @Body() updateDto: CreateMenuItemDto): Promise<MenuItemResponseDto> {
        return this.executeRoute('updateMenuItem', params, updateDto) as Promise<MenuItemResponseDto>;
    }

    @Delete('/:Id')
    @Roles(USER_ROLES.ADMIN)
    async deleteMenuItem(@Param() params: IdParamDto): Promise<void> {
        return this.executeRoute('deleteMenuItem', params) as Promise<void>;
    }
}