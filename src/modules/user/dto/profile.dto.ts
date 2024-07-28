import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, Length } from "class-validator";
import { Gender } from "../enums/gender.enum";

export class UpdateProfileDto {
    @ApiPropertyOptional()
    @Length(3, 50)
    nickname: string;

    @ApiPropertyOptional({ nullable: true })
    @Length(10, 200)
    bio: string;

    @ApiPropertyOptional({ nullable: true, format: 'binary' })
    avatar: string;

    @ApiPropertyOptional({ nullable: true, format: 'binary' })
    bgImage: string;

    @ApiPropertyOptional({ nullable: true, enum: Gender })
    @IsEnum(Gender)
    gender: number;

    @ApiPropertyOptional({ nullable: true })
    birthday: Date;

    @ApiPropertyOptional({ nullable: true })
    linkedin: string;

    @ApiPropertyOptional({ nullable: true })
    twitter: string;
}