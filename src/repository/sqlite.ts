import { OAuthRepository } from './repository';

export class OAuthSQLiteRepository extends OAuthRepository {
    
    getConnection(): Promise<boolean> {
        return this.createConnection({
            type: 'sqlite',
            database: 'sqlitedb.db',
            entities: this.entities,
            migrations: this.migrations,
            subscribers: this.subscribers,
            synchronize: true,
        });
    }
    
}
    