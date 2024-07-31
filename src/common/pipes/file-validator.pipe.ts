import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { unlink } from 'fs/promises';
import { extname } from 'path';

@Injectable()
export class FileTypeValidatorPipe implements PipeTransform {
	private readonly allowedExtensions = ['.jpg', '.jpeg', '.png'];

	async transform(value: any) {
		try {
			// Check if the value is an object
			if (!value || typeof value !== 'object') {
				throw new BadRequestException('Invalid file data');
			}

			// Handle file validation
			await this.validateFiles(value, 'avatar');
			await this.validateFiles(value, 'bgImage');

			return value;
		} catch (error) {
			throw error;
		}
	}

	private async validateFiles(value: any, fieldName: string) {
		const files = value[fieldName];
		if (files && Array.isArray(files)) {
			for (const file of files) {
				if (!file || !file.originalname) {
					throw new BadRequestException(`Invalid file in ${fieldName}`);
				}

				const fileExtension = extname(file.originalname).toLowerCase();
				if (!this.allowedExtensions.includes(fileExtension)) {
					// Remove the invalid file
					await unlink(file.path);
					throw new BadRequestException(
						`Invalid file type in ${fieldName}. Allowed types: ${this.allowedExtensions.join(
							', ',
						)}`,
					);
				}
			}
		}
	}
}
