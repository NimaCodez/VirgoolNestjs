import { ApiPropertyOptional } from "@nestjs/swagger"

export class PaginationDto {
    @ApiPropertyOptional({ type: 'number' })
    page: number;
    
    @ApiPropertyOptional({ type: 'number' })
    limit: number;
}