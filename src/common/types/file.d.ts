import 'multer';

type MulterFileDetails = {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	destination: string;
	filename: string;
	path: string;
	size: number;
};

declare global {
	namespace Express {
		namespace Multer {
			interface File {
				avatar?: [MulterFileDetails];
				bgImage?: [MulterFileDetails];
			}
		}
	}
}
