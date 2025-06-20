import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { IdParamDto } from 'src/common/dto/IdParam.dto';
import { CreateCategoryDto } from './dto/category.create.dto';
import { CategoryResponseDto } from './dto/category.res.dto';
import { CategoryService } from './category.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SystemRoleGuard } from '../auth/guards/sys-role.guard';
import { USER_ROLES } from '../auth/dto/all.roles.dto';
import { Roles } from '../auth/decorators/sys.role.decorators';

@ApiBearerAuth()
@UseGuards(SystemRoleGuard)
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    private async executeRoute(
        operation: 'getAll' | 'getCategory' | 'createCategory' | 'updateCategory' | 'deleteCategory',
        params?: IdParamDto | CreateCategoryDto, body?: CreateCategoryDto
    ) {
        switch (operation) {
            case 'getAll':
                return this.categoryService.getAllCategory();
            case 'getCategory':
                return this.categoryService.getCategory(params as IdParamDto);
            case 'updateCategory':
                return this.categoryService.updateCategory(params as IdParamDto, body as CreateCategoryDto);
            case 'deleteCategory':
                return this.categoryService.deleteCategory(params as IdParamDto);
            default:
                throw new HttpException('Invalid operation', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/')
    @Roles(USER_ROLES.ADMIN, USER_ROLES.CUSTOMER)
    async getAllCategory(): Promise<CategoryResponseDto[]> {
        return this.executeRoute('getAll') as Promise<CategoryResponseDto[]>;
    }

    @Get('/:Id')
    @Roles(USER_ROLES.ADMIN, USER_ROLES.CUSTOMER)
    async getCategory(@Param() params: IdParamDto): Promise<CategoryResponseDto> {
        return this.executeRoute('getCategory', params) as Promise<CategoryResponseDto>;
    }

    @Post('/')
    @Roles(USER_ROLES.ADMIN, USER_ROLES.CUSTOMER)
    async createCategory(@Body() createDto: CreateCategoryDto): Promise<CategoryResponseDto> {
        return this.categoryService.createCategory(createDto);
    }

    @Put('/:Id')
    @Roles(USER_ROLES.ADMIN)
    async updateCategory(@Param() params: IdParamDto, @Body() updateDto: CreateCategoryDto): Promise<CategoryResponseDto> {
        return this.executeRoute('updateCategory', params, updateDto) as Promise<CategoryResponseDto>;
    }

    @Roles(USER_ROLES.ADMIN)
    @Delete('/:Id')
    async deleteCategory(@Param() params: IdParamDto): Promise<void> {
        return this.executeRoute('deleteCategory', params) as Promise<void>;
    }
}