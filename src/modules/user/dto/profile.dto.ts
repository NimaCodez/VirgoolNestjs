import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Gender } from "../enums/gender.enum";

export class UpdateProfileDto {
    @ApiPropertyOptional()
    @IsOptional()
    @Length(3, 50)
    nickname: string;
    
    @ApiPropertyOptional({ nullable: true, minimum: 10, maximum: 100 })
    @IsOptional()
    bio: string;
    
    @ApiPropertyOptional({ nullable: true, format: 'binary' })
    @IsOptional()
    avatar: string;
    
    @ApiPropertyOptional({ nullable: true, format: 'binary' })
    @IsOptional()
    bgImage: string;
    
    @ApiPropertyOptional({ nullable: true, enum: Gender })
    @IsOptional()
    @IsEnum(Gender)
    gender: Gender;
    
    @ApiPropertyOptional({ nullable: true })
    @IsOptional()
    birthday: Date;
    
    @ApiPropertyOptional({ nullable: true })
    @IsOptional()
    linkedin: string;
    
    @ApiPropertyOptional({ nullable: true })
    @IsOptional()
    twitter: string;
}

export class ChangeUsernameDto {
    @ApiProperty()
    @IsString()
    @Length(3, 100)
    username: string;
}