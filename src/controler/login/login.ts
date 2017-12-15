import * as express from "express";
import {OAuthEntity} from "../../entity/oauth";
import {OAuthSQLiteRepository} from "../../repository/sqlite";

export const Login = (repository: OAuthSQLiteRepository, jwt: any) =>
    async (request: express.Request, response: express.Response) => {
        try {
            const user: OAuthEntity = await repository.ofUser(request.body.user) || new OAuthEntity();
            console.log(user)
            if (user.password === request.body.password && user.id) {
                const token = jwt.sign({user: user.id});
                response.send({token});
            } else {
                response.status(400).send('Not exist or invalid!');
            }
        } catch (error) {
            response.status(500).send('Internal error!');
        }
    };