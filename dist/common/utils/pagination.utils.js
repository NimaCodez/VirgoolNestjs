"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationResponseGenerator = exports.PaginationExecutor = void 0;
function PaginationExecutor(paginationDto) {
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
exports.PaginationExecutor = PaginationExecutor;
function PaginationResponseGenerator(count = 0, page = 0, limit = 0) {
    return {
        totalCount: count,
        page: +page,
        limit: +limit,
        pageCount: Math.ceil(+count / +limit),
    };
}
exports.PaginationResponseGenerator = PaginationResponseGenerator;
//# sourceMappingURL=pagination.utils.js.map