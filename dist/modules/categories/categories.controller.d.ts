import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from './dto/pagination.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        message: string;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        categories: import("./entities/category.entity").Category[];
        pagination: {
            totalCount: number;
            page: number;
            limit: number;
            pageCount: number;
        };
    }>;
    findOne(id: string): string;
    update(id: string, updateCategoryDto: UpdateCategoryDto): string;
    remove(id: string): string;
}
