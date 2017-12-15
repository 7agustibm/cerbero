import {} from 'typeorm/repository/Repository';
import {Connection, createConnection, Repository} from 'typeorm';
import { OAuthEntity } from '../entity/oauth';

export abstract class OAuthRepository {
    protected connection: Connection;
    protected repository: Repository<OAuthEntity>;
    protected entities = [OAuthEntity];
    protected migrations = [];
    protected subscribers = [];

    abstract getConnection(): Promise<boolean>;

    setConnection(connection: Connection) {
        this.connection = connection;
        this.repository = connection.getRepository(OAuthEntity);
        return true;
    }

    startMigrations(): Promise<boolean> {
        return this.connection.runMigrations()
            .then(() => true)
            .catch(() => false);
    }

    ping() {
        return this.repository.query('select \'pong\' as \'ping\'')
            .then(data => data[0].ping === 'pong');
    }

    save(user: OAuthEntity) {
    	return this.repository.save(user)
    		.then(data => {
			console.log(data);
			return data;
		});
    }

    delete(id: string) {
        return this.repository.removeById(id);
    }

    ofUser(user: string) {
        return this.repository.findOneById(user);
    }

    ofUserID(id: string) {
        return this.repository.findOne({id});
    }

    protected createConnection(options: any) {
        return createConnection(options)
            .then(connection => this.setConnection(connection))
            .catch((error) => {
                console.log('createConnection', error);
                return false;
            });
    }
}
