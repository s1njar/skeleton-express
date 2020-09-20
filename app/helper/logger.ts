import {ColorfulChalkLogger, ERROR} from "@barusu/chalk-logger";

/**
 * @const Logger
 */
export const logger = new ColorfulChalkLogger('project', {
    level: ERROR,
    date: false,
    colorful: true
}, process.argv);