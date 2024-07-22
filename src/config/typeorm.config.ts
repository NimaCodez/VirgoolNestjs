import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export function typeormConfig(): TypeOrmModuleOptions {
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
    }
}