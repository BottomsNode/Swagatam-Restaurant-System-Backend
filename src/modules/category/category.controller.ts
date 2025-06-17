import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters } from '@nestjs/common';
import { IdParamDto } from 'src/common/dto/IdParam.dto';
import { CreateCategoryDto } from './dto/category.create.dto';
import { CategoryResponseDto } from './dto/category.res.dto';
import { CommonExceptionFilter } from 'src/common/error/exception.handler';
import { CategoryService } from './category.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('category')
@UseFilters(CommonExceptionFilter)
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
    async getAllCategory(): Promise<CategoryResponseDto[]> {
        return this.executeRoute('getAll') as Promise<CategoryResponseDto[]>;
    }

    @Get('/:Id')
    async getCategory(@Param() params: IdParamDto): Promise<CategoryResponseDto> {
        return this.executeRoute('getCategory', params) as Promise<CategoryResponseDto>;
    }

    @Post('/')
    async createCategory(@Body() createDto: CreateCategoryDto): Promise<CategoryResponseDto> {
        return this.categoryService.createCategory(createDto);
    }

    @Put('/:Id')
    async updateCategory(@Param() params: IdParamDto, @Body() updateDto: CreateCategoryDto): Promise<CategoryResponseDto> {
        return this.executeRoute('updateCategory', params, updateDto) as Promise<CategoryResponseDto>;
    }

    @Delete('/:Id')
    async deleteCategory(@Param() params: IdParamDto): Promise<void> {
        return this.executeRoute('deleteCategory', params) as Promise<void>;
    }
}