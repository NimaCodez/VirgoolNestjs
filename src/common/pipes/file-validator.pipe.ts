import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileTypeValidatorPipe implements PipeTransform {
  private readonly allowedExtensions = ['.jpg', '.jpeg', '.png'];

  transform(value: any) {
    // Check if the value is an object
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Invalid file data');
    }

    // Handle file validation
    this.validateFiles(value, 'avatar');
    this.validateFiles(value, 'bgImage');

    return value;
  }

  private validateFiles(value: any, fieldName: string) {
    const files = value[fieldName];
    if (files && Array.isArray(files)) {
      files.forEach(file => {
        if (!file || !file.originalname) {
          throw new BadRequestException(`Invalid file in ${fieldName}`);
        }

        const fileExtension = extname(file.originalname).toLowerCase();
        if (!this.allowedExtensions.includes(fileExtension)) {
          throw new BadRequestException(`Invalid file type in ${fieldName}. Allowed types: ${this.allowedExtensions.join(', ')}`);
        }
      });
    }
  }
}
