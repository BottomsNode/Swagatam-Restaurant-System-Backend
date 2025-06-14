import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { IdParamDto } from 'src/common/dto/IdParam.dto';
import { CustomerResponseDto } from './dto/customer.res.dto';
import { CreateCustomerDto } from './dto/customer.create.dto';

@Controller('customer')
export class CustomerController {

    constructor(
        private readonly customerService: CustomerService,
    ) { }


    // GET Route Comman
    private async executeRoute(
        operation: 'getAll' | 'getCustomer' | 'createCustomer' | 'updateCustomer' | 'deleteCustomer',
        params?: IdParamDto | CreateCustomerDto,
    ) {
        switch (operation) {
            case 'getAll':
                return this.customerService.getAllCustomer();
            case 'getCustomer':
                return this.customerService.getCustomer(params as IdParamDto);
            case 'createCustomer':
                return this.customerService.createCustomer(params as CreateCustomerDto);
            // case 'updateCustomer':
            //     return this.customerService.updateCustomer(params : IdParamDto , data: CreateCustomerDto)data);
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

    @Post('/')
    async createCustomer(@Body() createDto: CreateCustomerDto): Promise<CustomerResponseDto> {
        return this.executeRoute('createCustomer', createDto) as Promise<CustomerResponseDto>;
    }

    // @Put('/:Id')
    // async updateCustomer(@Param() params: IdParamDto, @Body() updateDto: CreateCustomerDto): Promise<CustomerResponseDto> {
    //     return this.executeRoute('updateCustomer', { id: params, data: updateDto }) as Promise<CustomerResponseDto>;
    // }

    @Delete('/:Id')
    async deleteCustomer(@Param() params: IdParamDto): Promise<void> {
        return this.executeRoute('deleteCustomer', params) as Promise<void>;
    }
}
