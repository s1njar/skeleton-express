import { NextFunction, Request, Response } from 'express';
import {Exception} from "../../src/Framework/Exception/Exception";
import {logger} from "../helper/logger";

/**
 * Catchs exception and formats them.
 *
 * @param error
 * @param request
 * @param response
 * @param next
 */
export default (
    error: Exception,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    const errors = error.errors || [];

    logger.error('Error: ', error)
    response
        .status(status)
        .send({
            status,
            message,
            errors
        })
}