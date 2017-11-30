import 'reflect-metadata';
import { PrimaryColumn, Entity, Column } from "typeorm";

@Entity('oauth')
export class OAuthEntity {
    
    @PrimaryColumn()
    user: string;

    @Column()
    password: string;

    @Column()
    id: string;

    @Column({default: 1})
    type: string;
}
