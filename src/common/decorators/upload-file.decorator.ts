import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { MulterDestination, MulterFilename } from "../utils/multer.utils";
import { diskStorage } from "multer";
import { MulterField } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export function UploadFile(args: string[]) {

    let FileFields: MulterField[] = args.map(field => ({
        name: field,
        maxCount: 1
    }));

    return applyDecorators(
        UseInterceptors(
            FileFieldsInterceptor(
                FileFields,
                {
                    storage: diskStorage({
                        destination: MulterDestination('user-profiles'),
                        filename: MulterFilename,
                    }),
                },
            ),
        )
    )
}