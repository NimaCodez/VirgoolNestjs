"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginate = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function Paginate() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiQuery)({
        name: 'page',
        type: Number,
        required: false,
        example: 1,
    }), (0, swagger_1.ApiQuery)({
        name: 'limit',
        type: Number,
        required: false,
        example: 10
    }));
}
exports.Paginate = Paginate;
//# sourceMappingURL=pagination.decorator.js.map