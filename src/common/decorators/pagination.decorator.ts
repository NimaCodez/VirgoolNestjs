import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function Paginate() {
	return applyDecorators(
		ApiQuery({
			name: 'page',
			type: Number,
			required: false,
			example: 1,
		}),
		ApiQuery({
			name: 'limit',
			type: Number,
			required: false,
			example: 10,
		}),
	);
}
