import { OAuthSQLiteRepository } from './sqlite';

export class RepositoryFactory {
    static create() {
        return new OAuthSQLiteRepository();
    }
}