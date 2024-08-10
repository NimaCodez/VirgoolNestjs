import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/blog.dto';
import { CreateSlug } from 'src/common/utils/slug-generator.utils';

@Injectable()
export class BlogService {
    constructor(@InjectRepository(Blog) private blogRepo: Repository<Blog>) {}

    async create(blogData: CreateBlogDto) {
        let { title, slug } = blogData;
        let finalSlug = slug ?? title;
        blogData.slug = CreateSlug(finalSlug);
        return blogData;
    }
}
