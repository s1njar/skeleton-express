import {NextFunction, Request, Response} from "express";

/**
 * Adds configuration for cors.
 *
 * @param request
 * @param response
 * @param next
 */
export default (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (request.method === 'OPTIONS') {
        response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return response.status(200).json({});
    }

    next();
}