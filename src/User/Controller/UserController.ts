import * as express from 'express';
import {Controller} from "../../Framework/Controller/Controller";
import {RegisterService} from "../Service/RegisterService";
import {Inject} from "typescript-ioc";
import {LoginService} from "../Service/LoginService";

/**
 * @class UserController
 */
export class UserController extends Controller {

    @Inject
    private registerService: RegisterService;

    @Inject
    private loginService: LoginService;

    /**
     * UserController constructor.
     */
    constructor() {
        super();
        this.router.post('/user/register', this.register);
        this.router.post('/user/login', this.login);
    }

    /**
     * Register user.
     *
     * @param request
     * @param response
     */
    private register = (
        request: express.Request,
        response: express.Response
    ): void => {
        let data = {
            email: request.body.email,
            password: request.body.password
        };

        let result = this.registerService.execute(data);

        this.respond(response, result);
    }

    /**
     * Login user.
     *
     * @param request
     * @param response
     */
    private login = (
        request: express.Request,
        response: express.Response
    ): void => {
        let data = {
            email: request.body.email,
            password: request.body.password
        };

        let result = this.loginService.execute(data);

        this.respond(response, result);
    }
}