"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./entities/category.entity");
const typeorm_2 = require("typeorm");
const pagination_utils_1 = require("../../common/utils/pagination.utils");
let CategoriesService = class CategoriesService {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async create(createCategoryDto) {
        let { title, priority } = createCategoryDto;
        title = await this.CheckCategoryExistence(title);
        await this.categoryRepo.insert({ title, priority });
        return {
            message: 'Category was created successfully',
        };
    }
    async CheckCategoryExistence(title) {
        title = title === null || title === void 0 ? void 0 : title.trim().toLowerCase();
        const category = await this.categoryRepo.findOneBy({ title });
        if (category)
            throw new common_1.ConflictException('Category already exists');
        return title;
    }
    async findAll(paginationDto) {
        const { skip, limit, page } = (0, pagination_utils_1.PaginationExecutor)(paginationDto);
        const [categories, count] = await this.categoryRepo.findAndCount({
            where: {},
            skip,
            take: limit,
        });
        return {
            categories,
            pagination: (0, pagination_utils_1.PaginationResponseGenerator)(count, page, limit),
        };
    }
    findOne(id) {
        return `This action returns a #${id} category`;
    }
    update(id, updateCategoryDto) {
        return `This action updates a #${id} category`;
    }
    remove(id) {
        return `This action removes a #${id} category`;
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map