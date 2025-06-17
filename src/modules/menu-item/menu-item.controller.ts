import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters } from '@nestjs/common';
import { IdParamDto } from 'src/common/dto/IdParam.dto';
import { MenuItemResponseDto } from './dto/menuItem.res.dto';
import { MenuItemService } from './menu-item.service';
import { CreateMenuItemDto } from './dto/menuItem.create.dto';
import { CommonExceptionFilter } from 'src/common/error/exception.handler';

@Controller('menu-item')
@UseFilters(CommonExceptionFilter)
export class MenuItemController {
    constructor(private readonly menuItemService: MenuItemService) { }

    private async executeRoute(
        operation: 'getAll' | 'getMenuItem' | 'createMenuItem' | 'updateMenuItem' | 'deleteMenuItem',
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
    async getAllMenuItem(): Promise<MenuItemResponseDto[]> {
        return this.executeRoute('getAll') as Promise<MenuItemResponseDto[]>;
    }

    @Get('/:Id')
    async getMenuItem(@Param() params: IdParamDto): Promise<MenuItemResponseDto> {
        return this.executeRoute('getMenuItem', params) as Promise<MenuItemResponseDto>;
    }

    @Post('/')
    async createMenuItem(@Body() createDto: CreateMenuItemDto): Promise<MenuItemResponseDto> {
        return this.menuItemService.createMenuItem(createDto);
    }

    @Put('/:Id')
    async updateMenuItem(@Param() params: IdParamDto, @Body() updateDto: CreateMenuItemDto): Promise<MenuItemResponseDto> {
        return this.executeRoute('updateMenuItem', params, updateDto) as Promise<MenuItemResponseDto>;
    }

    @Delete('/:Id')
    async deleteMenuItem(@Param() params: IdParamDto): Promise<void> {
        return this.executeRoute('deleteMenuItem', params) as Promise<void>;
    }
}