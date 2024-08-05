import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Req,
	Put,
	UploadedFiles,
	UsePipes,
	Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { SwaggerConsumes } from 'src/common/enum/swagger-consumes.enum';
import { ChangeUsernameDto, UpdateProfileDto } from './dto/profile.dto';
import { ApplyAuth } from 'src/common/decorators/add-auth.decorator';
import { UploadFile } from 'src/common/decorators/upload-file.decorator';
import { FileTypeValidatorPipe } from 'src/common/pipes/file-validator.pipe';

@Controller('user')
@ApiTags('User')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Put('/profile')
	@ApplyAuth()
	@ApiConsumes(SwaggerConsumes.Multipart)
	@UsePipes(FileTypeValidatorPipe)
	@UploadFile(['avatar', 'bgImage'])
	async updateOrCreateProfile(
		@UploadedFiles() files: Express.Multer.File,
		@Body() updateProfileDto: UpdateProfileDto,
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

	@Patch('/change-username')
	changeUsername(@Body('id') usernameDto: ChangeUsernameDto) {
		const { username } = usernameDto;
		return this.userService.changeUsername(username);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	}
}
