import {IServiceProvider} from "./IServiceProvider";
import databaseConfig from "../../../app/config/database";
import mongoose from 'mongoose';
import {logger} from "../../../app/helper/logger";

/**
 * @class MongooseServiceProvider
 */
export class MongoDbServiceProvider implements IServiceProvider {

    /**
     * Registers MongoDB.
     */
    public register(): Promise<void> {
        return new Promise((resolve) => {
            let data = {
                user: databaseConfig.user,
                password: databaseConfig.password,
                host: databaseConfig.hostname,
                port: databaseConfig.port,
                database: databaseConfig.database
            };

            mongoose.connect(
                this.getConnection(data),
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                }
            ).then(() => {
                logger.info('Successful connected to MongoDB');
                resolve();
            }).catch((err) => {
                logger.error('Failed connecting to MongoDB');
                resolve();
            });
        })
    }

    /**
     * Returns connection string.
     *
     * @private
     */
    private getConnection(
        data: {
            user: string,
            password: string,
            host: string,
            port: number,
            database: string
        }
    ): string {
        let connection = 'mongodb://';

        if (data.user && data.password) {
            connection = connection.concat(`${data.user}:${data.password}@`);
        }

        return connection.concat(`${data.host}:${data.port}/${data.database}`);
    }
}
