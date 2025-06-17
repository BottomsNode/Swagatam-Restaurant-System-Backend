import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { IdParamDto } from 'src/common/dto/IdParam.dto';
import { CommonExceptionFilter } from 'src/common/error/exception.handler';
import { StaffResponseDto } from './dto/staf.res.dto';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/staff.create.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('staff')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@UseFilters(CommonExceptionFilter)
export class StaffController {
    constructor(private readonly staffService: StaffService) { }

    private async executeRoute(
        operation: 'getAll' | 'getStaff' | 'createStaff' | 'updateStaff' | 'deleteStaff',
        params?: IdParamDto | CreateStaffDto, body?: CreateStaffDto
    ) {
        switch (operation) {
            case 'getAll':
                return this.staffService.getAllStaff();
            case 'getStaff':
                return this.staffService.getStaff(params as IdParamDto)
            case 'updateStaff':
                return this.staffService.updateStaff(params as IdParamDto, body as CreateStaffDto);
            case 'deleteStaff':
                return this.staffService.deleteStaff(params as IdParamDto);
            default:
                throw new HttpException('Invalid operation', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/')
    async getAllStaff(): Promise<StaffResponseDto[]> {
        return this.executeRoute('getAll') as Promise<StaffResponseDto[]>;
    }

    @Get('/:Id')
    async getStaff(@Param() params: IdParamDto): Promise<StaffResponseDto> {
        return this.executeRoute('getStaff', params) as Promise<StaffResponseDto>;
    }

    @Post('/')
    async createStaff(@Body() createDto: CreateStaffDto): Promise<StaffResponseDto> {
        return this.staffService.createStaff(createDto as CreateStaffDto);
    }

    @Put('/:Id')
    async updateStaff(@Param() params: IdParamDto, @Body() updateDto: CreateStaffDto): Promise<StaffResponseDto> {
        return this.executeRoute('updateStaff', params, updateDto) as Promise<StaffResponseDto>;
    }

    @Delete('/:Id')
    async deleteStaff(@Param() params: IdParamDto): Promise<void> {
        return this.executeRoute('deleteStaff', params) as Promise<void>;
    }
}