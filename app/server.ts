import App from './app';
import appConfig from './config/application';
import {Container} from "typescript-ioc";
import {UserController} from '../src/User/Controller/UserController';
import {MongoDbServiceProvider} from "../src/Framework/Provider/MongoDbServiceProvider";

const app = new App();

const controllers = [
    Container.get(UserController)
];

const serviceProvider = [
    Container.get(MongoDbServiceProvider)
];

app.preInitializeMiddlewares();
app.initializeControllers(controllers);
app.postInitializeMiddlewares();
app.initializeServiceProvider(serviceProvider).then(() => {
    app.listen(appConfig.port, appConfig.hostname);
});