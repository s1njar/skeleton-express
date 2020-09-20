import {IController} from "./IController";
import {Request, Response, Router} from "express";
import * as express from "express";
import {IResultResponse} from "../Model/IResultResponse";
import User, {IUser} from "../../User/Models/User";
import application from "../../../app/config/application";
import {logger} from "../../../app/helper/logger";

/**
 * @class Controller
 */
export class Controller implements IController {

    /**
     * @type express.Router
     */
    public router = express.Router();

    /**
     * Creates normalized json response.
     *
     * @param response
     * @param promise
     */
    public respond(response: Response, promise: Promise<IResultResponse>): void {
        promise
            .then((result) => {
                response.status(200).json({
                    "status": 200,
                    "message": "ok",
                    "data": result.getdata()
                });
            })
            .catch((error) => {
                if (application.debugMode) {
                    logger.error('Error: ', error);
                }

                response.status(error.status || 500).json({
                    status: error.status || 500,
                    message: error.message || "Something went wrong",
                    errors: error.errors || []
                });
            });
    }

    /**
     * Returns authenticated user model.
     *
     * @param request
     */
    public async getUser(request: Request): Promise<IUser | null> {
        try {
            // @ts-ignore
            let userId = request.userData.id;
            return User.findById(userId).exec();
        } catch (error) {
            return null;
        }
    }

}