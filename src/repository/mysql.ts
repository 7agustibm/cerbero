import { OAuthRepository } from './repository';

export class OAuthMySQLRepository extends OAuthRepository {
    
    getConnection(): Promise<boolean> {
        return this.createConnection({
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT || 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            name: process.env.MYSQL_DATABASE,
            entities: this.entities,
            migrations: this.migrations,
            subscribers: this.subscribers,
            synchronize: true,
        });
    }
    
}
    