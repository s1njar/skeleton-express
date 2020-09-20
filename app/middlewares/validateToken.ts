import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import application from "../config/application";

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
    try {
        const token = request.headers.authorization.split(" ")[1];
        // @ts-ignore
        request.userData = jwt.verify(token, application.tokenSecret);
        next();
    } catch (error) {
        return response.status(401).json({
            status: 401,
            message: 'Auth failed.',
            errors: []
        });
    }
}