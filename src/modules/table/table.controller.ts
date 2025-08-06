import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { TableResponseDto } from './dto/table.res.dto';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/table.create.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SystemRoleGuard } from '../auth/guards/sys-role.guard';
import { Roles } from '../auth/decorators/sys.role.decorators';
import { USER_ROLES } from '../auth/dto/all.roles.dto';
import { IdParamDto } from '@/common/dto/IdParam.dto';

@Controller('table')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), SystemRoleGuard)
export class TableController {
    constructor(private readonly tableService: TableService) { }

    private async executeRoute(
        operation: 'getAll' | 'getTable' | 'createTable' | 'updateTable' | 'deleteTable',
        params?: IdParamDto | CreateTableDto, body?: CreateTableDto
    ) {
        switch (operation) {
            case 'getAll':
                return this.tableService.getAllTable();
            case 'getTable':
                return this.tableService.getTable(params as IdParamDto)
            case 'updateTable':
                return this.tableService.updateTable(params as IdParamDto, body as CreateTableDto)
            case 'deleteTable':
                return this.tableService.deleteTable(params as IdParamDto);
            default:
                throw new HttpException('Invalid operation', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/')
    @Roles(USER_ROLES.CUSTOMER, USER_ROLES.ADMIN)
    async getAllTable(): Promise<TableResponseDto[]> {
        return this.executeRoute('getAll') as Promise<TableResponseDto[]>;
    }

    @Get('/:Id')
    @Roles(USER_ROLES.CUSTOMER, USER_ROLES.ADMIN)
    async getTable(@Param() params: IdParamDto): Promise<TableResponseDto> {
        return this.executeRoute('getTable', params) as Promise<TableResponseDto>;
    }

    @Post('/')
    @Roles(USER_ROLES.ADMIN)
    async createTable(@Body() createDto: CreateTableDto): Promise<TableResponseDto> {
        return this.tableService.createTable(createDto);
    }

    @Put('/:Id')
    @Roles(USER_ROLES.ADMIN)
    async updateTable(@Param() params: IdParamDto, @Body() updateDto: CreateTableDto): Promise<TableResponseDto> {
        return this.executeRoute('updateTable', params, updateDto) as Promise<TableResponseDto>;
    }

    @Delete('/:Id')
    @Roles(USER_ROLES.ADMIN)
    async deleteTable(@Param() params: IdParamDto): Promise<void> {
        return this.executeRoute('deleteTable', params) as Promise<void>;
    }
}