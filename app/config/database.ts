import * as dotenv from 'dotenv';
dotenv.config();

/**
 * @const Process
 */
declare const process : {
    env: {
        DB_HOST: string,
        DB_PORT: number,
        DB_DATABASE: string,
        DB_USER: string,
        DB_PASSWORD: string,
    }
}

/**
 * @export Database
 */
export default {
    hostname: process.env.DB_HOST ?? '127.0.0.1',
    port: process.env.DB_PORT ?? 27017,
    database: process.env.DB_DATABASE ?? 'db',
    user: process.env.DB_USER ?? '',
    password: process.env.DB_PASSWORD ?? '',
}