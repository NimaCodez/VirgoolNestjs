import { Body, Controller, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/blog.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApplyAuth } from 'src/common/decorators/add-auth.decorator';
import { SwaggerConsumes } from 'src/common/enum/swagger-consumes.enum';

@Controller('blog')
@ApiTags('Blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  
  @Post()
  @ApplyAuth()
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  create(@Body() blogDto: CreateBlogDto) {
    return this.blogService.create(blogDto)
  }
}
