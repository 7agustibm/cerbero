import { OAuthSQLiteRepository } from './sqlite';
import 'sqlite3';
import 'mysql';
import { OAuthMySQLRepository } from './mysql';

export class RepositoryFactory {
    static create() {
        if(process.env.NODE_ENV === 'production' && process.env.MYSQL_HOST && process.env.MYSQL_USER && process.env.MYSQL_PASSWORD && process.env.MYSQL_DATABASE) {
            return new OAuthMySQLRepository();
        }
        return new OAuthSQLiteRepository();
    }
}