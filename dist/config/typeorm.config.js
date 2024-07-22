"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeormConfig = void 0;
function typeormConfig() {
    const { DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASS } = process.env;
    return {
        type: 'postgres',
        host: DB_HOST,
        port: +DB_PORT,
        password: DB_PASS,
        username: DB_USER,
        database: DB_NAME,
        synchronize: true,
        autoLoadEntities: false,
        entities: [
            "dist/**/**/**/*.entity{.ts,.js}",
            "dist/**/**/*.entity{.ts,.js}",
        ]
    };
}
exports.typeormConfig = typeormConfig;
//# sourceMappingURL=typeorm.config.js.map