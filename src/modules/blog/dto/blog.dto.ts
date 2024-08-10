import { Optional } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateBlogDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(10, 150)
    title: string;
    
    @ApiPropertyOptional()
    @Optional()
    slug: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    timeToRead: string;

    @ApiPropertyOptional({format: 'binary'})
    image: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @Length(10, 300)
    description: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @Length(100)
    content: string;
}