import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { IdParamDto } from 'src/common/dto/IdParam.dto';
import { CustomerResponseDto } from './dto/customer.res.dto';
import { CreateCustomerDto } from './dto/customer.create.dto';
import { CommonExceptionFilter } from 'src/common/error/exception.handler';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LoggingInterceptors } from 'src/common/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(LoggingInterceptors,TransformInterceptor)
@UseFilters(CommonExceptionFilter)
@Controller('customer')
export class CustomerController {

    constructor(
        private readonly customerService: CustomerService,
    ) { }


    // GET Route Comman
    private async executeRoute(
        operation: 'getAll' | 'getCustomer' | 'createCustomer' | 'updateCustomer' | 'deleteCustomer',
        params?: IdParamDto , body?: CreateCustomerDto
    ) {
        switch (operation) {
            case 'getAll':
                return this.customerService.getAllCustomer();
            case 'getCustomer':
                return this.customerService.getCustomer(params as IdParamDto);
            case 'updateCustomer':
                return this.customerService.updateCustomer(params as IdParamDto, body as CreateCustomerDto);
            case 'deleteCustomer':
                return this.customerService.deleteCustomer(params as IdParamDto);
            default:
                throw new HttpException('Invalid operation', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/')
    async getAllCustomer(): Promise<CustomerResponseDto[]> {
        return this.executeRoute('getAll') as Promise<CustomerResponseDto[]>;
    }

    @Get('/:Id')
    async getCustomer(@Param() params: IdParamDto): Promise<CustomerResponseDto> {
        return this.executeRoute('getCustomer', params) as Promise<CustomerResponseDto>;
    }

    // @Post('/')
    // async createCustomer(@Body() createDto: CreateCustomerDto): Promise<CustomerResponseDto> {
    //     return this.customerService.createCustomer(createDto);
    // }

    @Put('/:Id')
    async updateCustomer(@Param() params: IdParamDto, @Body() updateDto: CreateCustomerDto): Promise<CustomerResponseDto> {
        return this.executeRoute('updateCustomer', params, updateDto) as Promise<CustomerResponseDto>;
    }

    @Delete('/:Id')
    async deleteCustomer(@Param() params: IdParamDto): Promise<void> {
        return this.executeRoute('deleteCustomer', params) as Promise<void>;
    }
}