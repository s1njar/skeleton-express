import {Router} from "express";

/**
 * @interface IController
 */
export interface IController {
    /**
     * @type Router
     */
    router: Router;
}