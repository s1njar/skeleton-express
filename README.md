Express IOC TS Boilerplate
==========================

## Introduction
This project is a boilerplate for creating an expressjs api 
with ioc container and typescript support. It already has
integration of mongoDB and provides routes for authenticating users.

It can be used for fast creating and expanding nodejs api's.

## Installation

##### 1. Clone project 
```console
$ git clone https://github.com/s1njar/express-ioc-ts-boilerplate express-api
```
##### 2. Change directory to project
```console
$ cd express-api
```
##### 3. Remove git folder
```console
$ rm -rf .git
```
##### 4. Copy dotenv config
```console
$ cp .env.example .env 
```
##### 5. Install package dependencies
```console
$ npm run install 
```
##### 6. Run project
```console
$ npm run watch 
```

##### 7. After connecting und starting it should look like following:
```console
$ 5:51:51 PM - File change detected. Starting incremental compilation...


$ 5:51:51 PM - Found 0 errors. Watching for file changes.
$ 2020-09-20 17:51:51 [info  project]: Successful connected to MongoDB
$ 2020-09-20 17:51:51 [info  project]: App listening on http://0.0.0.0:5000
```

## Configuration
##### Configure MongoDB in .env:

```text
APP_HOSTNAME=0.0.0.0
APP_PORT=5000
APP_TOKEN_SECRET=Token123!456$
APP_TOKEN_DURATION=86400
APP_DEBUG_MODE=1

DB_HOST=127.0.0.1
DB_PORT=27017
DB_DATABASE=db
DB_USER=
DB_PASSWORD=
```

## Usage

##### Register new user:
```js
POST: "http://0.0.0.0:5000/user/register"
```

```json
{
    "email": "s1njar.mail@gmail.com",
    "password": "Password123"
}
```
```json
{
    "status": 200,
    "message": "ok",
    "data": {
        "_id": "5f67773619a9f93339c1fb6f",
        "email": "s1njar.mail@gmail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNjc3NzM2MTlhOWY5MzMzOWMxZmI2ZiIsImVtYWlsIjoiczFuamFyLm1haWxAZ21haWwuY29tIiwiaWF0IjoxNjAwNjE2MjQ2LCJleHAiOjE2MDA3MDI2NDZ9.0016EStB_50RgwP552hYAxFc73mcD_vr__ZZoGx3hyU"
    }
}
```

##### Login existing user:
```js
POST: "http://0.0.0.0:5000/user/login"
```

```json
{
    "email": "s1njar.mail@gmail.com",
    "password": "Password123"
}
```
```json
{
    "status": 200,
    "message": "ok",
    "data": {
        "_id": "5f6779669908914dd6e580f4",
        "email": "s1njar.mail@gmail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNjc3OTY2OTkwODkxNGRkNmU1ODBmNCIsImVtYWlsIjoiczFuamFyLm1haWxAZ21haWwuY29tIiwiaWF0IjoxNjAwNjE2ODA4LCJleHAiOjE2MDA3MDMyMDh9.CpTlEtbmVvrD1HWl41-kqpv-lkQc5482Ok-HqbgT-_E"
    }
}
```

## Expand project

### Create new Controller:

##### 1. Create controller class which extends Controller
In constructor of the controller class you can define routes,
which call then defined closures.
Auth protected routes can be used with setting middleware 'validateToken',
between route path and route action call.
 
```ts
import {Controller} from "../../Framework/Controller/Controller";
import * as express from "express"; 
import validateToken from "./validateToken";

export class ExampleController extends Controller{
    constructor() {
        super();
        this.router.post('/example', this.example);
        this.router.post('/example/auth', validateToken, this.example);
    }

    private example = (
        request: express.Request,
        response: express.Response
    ): void => {
        
    }
}
```
##### 2. Respond from action
To respond from action its either possible to return data directly via 
response or to call method responde() with a Promise, which promises IResultResponse:
```ts
this.respond(response, Promise<IResultResponse>);
```
```ts
response.status(200).json({id: 1});
```
```json
{
    "status": 200,
    "message": "ok",
    "data": {
      "id": 1
    }
}
```
If an exception will be thrown in code it will converted into structured data
and respond it.
```ts
throw new Exception(500, "Example error message.");
```
```json
{
    "status": 500,
    "message": "Example error message.",
    "errors": []
}
```

##### 3. Init controller in server.ts
```ts
const controllers = [
    Container.get(UserController),
    Container.get(ExampleController)
];
```

### Create new Service Provider:

##### 1. Create new Service Provider with implementing IServiceProvider
It has to return a custom Promise<void>. 
```ts
export class ExampleServiceProvider implements IServiceProvider {
    public register(): Promise<void> {
        return new Promise((resolve) => {
            //TODO: Add your code
            resolve();
        })
    }
}
```

##### 2. Init Service Provider
```ts
const serviceProvider = [
    Container.get(MongoDbServiceProvider),
    Container.get(ExampleServiceProvider)
];
```

### Creating middlewares:

##### 1. Create new middleware function.
```ts
export default (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    //TODO: Add your code
    next();
}
```

##### 2. Init middleware
In app class its possible to add middlewares before and after the controllers
will be called. This is necessary for loading sequence.
```ts
export class App{
    public preInitializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
        this.app.use(corsMiddleware);
    }

    public postInitializeMiddlewares() {
        this.app.use(errorMiddleware);
    }
}
```

### Using dependency injection:

##### 1. Injecting classes into class.
A detailed description can be found at https://www.npmjs.com/package/typescript-ioc.
```ts
export class UserController{
    @Inject
    private registerService: RegisterService;

    @Inject
    private loginService: LoginService;
}
```
## Credits
If you got questions or feedback feel free to contact me.

- Discord: s1njar#0066
- Mail: s1njar.mail@gmail.com

## Links

- [ExpressJs](https://github.com/expressjs/express)
- [IOC Container](https://www.npmjs.com/package/typescript-ioc)
- [Typescript](https://www.typescriptlang.org/)

## License

The MIT License (MIT).