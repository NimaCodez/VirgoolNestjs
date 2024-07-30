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
	UseInterceptors,
	UploadedFiles,
	ParseFilePipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../auth/guards/auth.guard';
import { Request } from 'express';
import { SwaggerConsumes } from 'src/common/enum/swagger-consumes.enum';
import { UpdateProfileDto } from './dto/profile.dto';
import {
	FileFieldsInterceptor,
	FileInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
	MulterDestination,
	MulterFilename,
} from 'src/common/utils/multer.utils';
import { ApplyAuth } from 'src/common/decorators/add-auth.decorator';

@Controller('user')
@ApiTags('User')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Put('/profile')
	@ApplyAuth()
	@ApiConsumes(SwaggerConsumes.Multipart)
	@UseInterceptors(
		FileFieldsInterceptor(
			[
				{
					name: 'avatar',
					maxCount: 1,
				},
				{
					name: 'bgImage',
					maxCount: 1,
				},
			],
			{
				storage: diskStorage({
					destination: MulterDestination('user-profiles'),
					filename: MulterFilename,
				}),
			},
		),
	)
	async updateOrCreateProfile(
		@UploadedFiles(new ParseFilePipe({
			fileIsRequired: false,
			validators: []
		})) files: Express.Multer.File,
		@Body() updateProfileDto: UpdateProfileDto
	) {
		return await this.userService.changeProfile(files, updateProfileDto);
	}

	@Get()
	@ApplyAuth()
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
