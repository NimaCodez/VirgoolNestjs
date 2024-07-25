namespace NodeJS {
	interface ProcessEnv {
		PORT: number;
		DB_HOST: string;
		DB_PORT: number;
		DB_USER: string;
		DB_PASS: string;
		DB_NAME: string;
		JWT_ACCESS_KEY_SECRET: string;
		JWT_REFRESH_KEY_SECRET: string;
	}
}
