import { PaginationDto } from 'src/modules/categories/dto/pagination.dto';
export declare function PaginationExecutor(paginationDto: PaginationDto): {
    page: number;
    limit: number;
    skip: number;
};
export declare function PaginationResponseGenerator(count?: number, page?: number, limit?: number): {
    totalCount: number;
    page: number;
    limit: number;
    pageCount: number;
};
