import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { PaginationExecutor, PaginationResponseGenerator } from 'src/common/utils/pagination.utils';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(Category) private categoryRepo: Repository<Category>,
	) {}

	async create(createCategoryDto: CreateCategoryDto) {
		let { title, priority } = createCategoryDto;
		title = await this.CheckCategoryExistence(title);

		await this.categoryRepo.insert({ title, priority });
		return {
			message: 'Category was created successfully',
		};
	}

	async CheckCategoryExistence(title: string) {
		title = title?.trim().toLowerCase();
		const category = await this.categoryRepo.findOneBy({ title });
		if (category) throw new ConflictException('Category already exists');

		return title;
	}

	async findAll(paginationDto: PaginationDto) {
		const { skip, limit, page } = PaginationExecutor(paginationDto);
		const [categories, count] = await this.categoryRepo.findAndCount({
      where: {},
			skip,
			take: limit,
		});

    return {
      categories,
      pagination: PaginationResponseGenerator(count, page, limit),
    }

	}

	findOne(id: number) {
		return `This action returns a #${id} category`;
	}

	update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return `This action updates a #${id} category`;
	}

	remove(id: number) {
		return `This action removes a #${id} category`;
	}
}
