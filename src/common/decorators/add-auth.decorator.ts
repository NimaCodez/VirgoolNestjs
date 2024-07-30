import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthUser } from "src/modules/auth/guards/auth.guard";

export function ApplyAuth() {
    return applyDecorators(
        UseGuards(AuthUser),
        ApiBearerAuth('Authorization')
    )
}