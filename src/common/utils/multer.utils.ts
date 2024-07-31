import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { mkdirSync } from 'fs';
import { extname, join } from 'path';

export type CallbackDestinationType = (
	error: Error,
	destination: string,
) => void;
export type CallbackFilenameType = (error: Error, fileName: string) => void;
export type MulterFile = Express.Multer.File;

export function MulterDestination(folderName: string) {
	return function (
		req: Request,
		file: MulterFile,
		callback: CallbackDestinationType,
	) {
		let path = join(
			process.cwd(),
			'public',
			'uploads',
			folderName,
			String(req.user.id),
		);
		mkdirSync(path, { recursive: true });
		callback(null, path);
	};
}

export function MulterFilename(
	req: Request,
	file: MulterFile,
	callback: CallbackFilenameType,
) {
	const ext = extname(file.originalname).toLowerCase();
	let filename = `${file.fieldname}${ext}`;
	callback(null, filename);
}

function IsValidImageFormat(ext: string) {
	return ['.jpg', '.jpeg', '.png'].includes(ext);
}
