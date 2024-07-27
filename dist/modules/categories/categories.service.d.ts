import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
export declare class CategoriesService {
    private categoryRepo;
    constructor(categoryRepo: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        message: string;
    }>;
    CheckCategoryExistence(title: string): Promise<string>;
    findAll(paginationDto: PaginationDto): Promise<{
        categories: Category[];
        pagination: {
            totalCount: number;
            page: number;
            limit: number;
            pageCount: number;
        };
    }>;
    findOne(id: number): string;
    update(id: number, updateCategoryDto: UpdateCategoryDto): string;
    remove(id: number): string;
}
