import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResponseDto } from './dto/customer.res.dto';
import { CreateCustomerDto } from './dto/customer.create.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/sys.role.decorators';
import { USER_ROLES } from '../auth/dto/all.roles.dto';
import { SystemRoleGuard } from '../auth/guards/sys-role.guard';
import { IdParamDto } from '@/common/dto/IdParam.dto';
import { PageParams } from '@/common/dto/PageParam.dto';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';

@ApiBearerAuth()
@ApiTags("Users")
@UseGuards(JwtAuthGuard)
@UseGuards(SystemRoleGuard)
@UseInterceptors(TransformInterceptor)
@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    private async executeRoute(
        operation: 'getAll' | 'getCustomer' | 'updateCustomer' | 'deleteCustomer' | 'getRecords' | 'getTotal',
        params?: IdParamDto,
        body?: CreateCustomerDto,
        page?: PageParams,
    ) {
        switch (operation) {
            case 'getAll':
                return this.customerService.getAllCustomer();
            case 'getCustomer':
                return this.customerService.getCustomer(params);
            case 'updateCustomer':
                return this.customerService.updateCustomer(params, body);
            case 'deleteCustomer':
                return this.customerService.deleteCustomer(params);
            case 'getRecords':
                return this.customerService.getCustomerRecords(page);
            case 'getTotal':
                return this.customerService.getTotalCustomers()
            default:
                throw new HttpException('Invalid operation', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/')
    @Roles(USER_ROLES.ADMIN, USER_ROLES.CUSTOMER)
    async getAllCustomer(): Promise<CustomerResponseDto[]> {
        return this.executeRoute('getAll') as Promise<CustomerResponseDto[]>;
    }

    @Get('/:Id')
    @Roles(USER_ROLES.ADMIN, USER_ROLES.CUSTOMER)
    async getCustomer(@Param() params: IdParamDto): Promise<CustomerResponseDto> {
        return this.executeRoute('getCustomer', params) as Promise<CustomerResponseDto>;
    }

    @Get('/:page/:records')
    @Roles(USER_ROLES.ADMIN, USER_ROLES.CUSTOMER)
    async getCustomerRecords(@Param() pages: PageParams): Promise<CustomerResponseDto> {
        return this.executeRoute('getRecords', null, null, pages) as Promise<CustomerResponseDto>
    }

    @Get('/tally/all/a')
    @Roles(USER_ROLES.ADMIN, USER_ROLES.CUSTOMER)
    async getCustomerTotal(): Promise<CustomerResponseDto> {
        return this.executeRoute('getTotal') as Promise<CustomerResponseDto>
    }

    @Put('/:Id')
    @Roles(USER_ROLES.CUSTOMER)
    async updateCustomer(@Param() params: IdParamDto, @Body() updateDto: CreateCustomerDto): Promise<CustomerResponseDto> {
        return this.executeRoute('updateCustomer', params, updateDto) as Promise<CustomerResponseDto>;
    }

    @Delete('/:Id')
    @Roles(USER_ROLES.ADMIN)
    async deleteCustomer(@Param() params: IdParamDto): Promise<void> {
        return this.executeRoute('deleteCustomer', params) as Promise<void>;
    }
}
