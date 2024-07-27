import { PaginationDto } from 'src/modules/categories/dto/pagination.dto';

export function PaginationExecutor(paginationDto: PaginationDto) {
	let { page = 0, limit = 10 } = paginationDto;

	page = page <= 1 ? 0 : page - 1;
	limit = limit <= 0 || !limit ? 10 : limit;
	let skip = page * limit;

	return {
		page: page === 0 ? 1 : page,
		limit,
		skip,
	};
}

export function PaginationResponseGenerator(
	count: number = 0,
	page: number = 0,
	limit: number = 0,
) {
    return {
        totalCount: count,
        page: +page,
        limit: +limit,
        pageCount: Math.ceil(+count / +limit),
    }
}
