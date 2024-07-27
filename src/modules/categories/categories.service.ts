import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

	async findOne(id: number) {
		const category = await this.categoryRepo.findOneBy({ id });
		if (!category) throw new NotFoundException('Category was not found');

		return category;
	}

	private FilterUpdates(dto: UpdateCategoryDto): Partial<UpdateCategoryDto> {
		return Object.fromEntries(
			Object.entries(dto)
				.filter(([_, value]) => value !== null && value !== undefined)
		);
	}

	async update(id: number, updateCategoryDto: UpdateCategoryDto) {
		const category = await this.findOne(id);

		const updates = this.FilterUpdates(updateCategoryDto);

		if (Object.keys(updates).length === 0 ) throw new BadRequestException('Nothing was updated');
		
		Object.assign(category, updates)
		await this.categoryRepo.save(category);

		return {
			message: 'Category was updated successfully',
		} 
	}

	async remove(id: number) {
		const category = await this.findOne(id);
		await this.categoryRepo.delete({ id: category.id });

		return {
			message: 'Category deleted'
		}
	}
}
