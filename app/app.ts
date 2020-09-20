import * as express from 'express';
import * as bodyParser from 'body-parser';
import {IController} from "../src/Framework/Controller/IController";
import {IServiceProvider} from "../src/Framework/Provider/IServiceProvider";
import errorMiddleware from "./middlewares/errorMiddleware";
import corsMiddleware from "./middlewares/corsMiddleware";
import morgan from "morgan";
import {logger} from "./helper/logger";

/**
 * @class App
 */
export default class App {

    /**
     * @type express.Application
     */
    public app: express.Application;

    /**
     * App constructor.
     */
    constructor() {
        this.app = express.default();
    }

    /**
     * Init middlewares before controllers.
     *
     * @private
     */
    public preInitializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
        this.app.use(corsMiddleware);
    }

    /**
     * Init middlewares after controllers.
     *
     * @private
     */
    public postInitializeMiddlewares() {
        this.app.use(errorMiddleware);
    }

    /**
     * Init controller.
     *
     * @param controllers
     * @private
     */
    public initializeControllers(controllers: IController[]) {
        controllers.forEach((controller: IController) => {
            this.app.use('/', controller.router);
        });
    }

    /**
     * Init service providers.
     *
     * @param serviceProviders
     */
    public async initializeServiceProvider(serviceProviders: IServiceProvider[]): Promise<void> {
        const promises = serviceProviders.map(async (serviceProvider: IServiceProvider) => {
            await serviceProvider.register();
        })

        await Promise.all(promises);
    }

    /**
     * Start app listening.
     *
     * @param port
     * @param hostname
     */
    public listen(port: number, hostname: string) {
        this.app.listen(port, hostname, () => {
            logger.info(`App listening on http://${hostname}:${port}`);
        });
    }
}