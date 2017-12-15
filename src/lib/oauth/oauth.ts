import { OAuthRepository } from '../../repository/repository';
const OAuth2Server = require('oauth2-server');
import {model} from "./model";

export const Oauth = (jwt: any, repository: OAuthRepository) => new OAuth2Server({
    model: model(jwt, repository)
});