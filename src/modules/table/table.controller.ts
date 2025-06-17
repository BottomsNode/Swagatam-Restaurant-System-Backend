import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters } from '@nestjs/common';
import { IdParamDto } from 'src/common/dto/IdParam.dto';
import { CommonExceptionFilter } from 'src/common/error/exception.handler';
import { TableResponseDto } from './dto/table.res.dto';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/table.create.dto';

@Controller('table')
@UseFilters(CommonExceptionFilter)
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
    async getAllTable(): Promise<TableResponseDto[]> {
        return this.executeRoute('getAll') as Promise<TableResponseDto[]>;
    }

    @Get('/:Id')
    async getTable(@Param() params: IdParamDto): Promise<TableResponseDto> {
        return this.executeRoute('getTable', params) as Promise<TableResponseDto>;
    }

    @Post('/')
    async createTable(@Body() createDto: CreateTableDto): Promise<TableResponseDto> {
        return this.tableService.createTable(createDto);
    }

    @Put('/:Id')
    async updateTable(@Param() params: IdParamDto, @Body() updateDto: CreateTableDto): Promise<TableResponseDto> {
        return this.executeRoute('updateTable', params, updateDto) as Promise<TableResponseDto>;
    }

    @Delete('/:Id')
    async deleteTable(@Param() params: IdParamDto): Promise<void> {
        return this.executeRoute('deleteTable', params) as Promise<void>;
    }
}