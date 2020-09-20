import * as dotenv from 'dotenv';
dotenv.config();

/**
 * @const Process
 */
declare const process : {
    env: {
        APP_HOSTNAME: string,
        APP_PORT: number,
        APP_TOKEN_SECRET: string,
        APP_TOKEN_DURATION: number,
        APP_DEBUG_MODE: boolean
    }
}

/**
 * @export Application
 */
export default {
    hostname: process.env.APP_HOSTNAME ?? '0.0.0.0',
    port: process.env.APP_PORT ?? 5000,
    tokenSecret: process.env.APP_TOKEN_SECRET ?? 'Token123!456$',
    tokenDuration: process.env.APP_TOKEN_DURATION ?? 86400,
    debugMode: !!+process.env.APP_DEBUG_MODE ?? false
}