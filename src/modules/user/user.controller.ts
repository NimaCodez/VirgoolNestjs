import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Req,
	Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../auth/guards/auth.guard';
import { Request } from 'express';
import { SwaggerConsumes } from 'src/common/enum/swagger-consumes.enum';
import { UpdateProfileDto } from './dto/profile.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Put('/profile')
	@ApiConsumes(SwaggerConsumes.Multipart)
  async updateOrCreateProfile(updateProfileDto: UpdateProfileDto) {
    return await this.userService.changeProfile(updateProfileDto);
  }

	@Get()
	@ApiBearerAuth('Authorization')
	@UseGuards(AuthUser)
	findAll(@Req() req: Request) {
		return this.userService.findAll(req);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.userService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	}
}
