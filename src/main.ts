import {RepositoryFactory} from './repository/factory';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {JWT, Oauth} from "./lib";
import {WhoAmI,Login} from "./controler";
import {OAuthRepository} from "./repository/repository";
import morgan = require("morgan");
import {Event} from './event';
const asciiArt = require('ascii-art');

const jwt = JWT(process.env.JWT_SECRET || 'secret');

const repository: OAuthRepository = RepositoryFactory.create();
const oauth = Oauth(jwt, repository);
Event(repository);

repository.getConnection();
const app: any = express();
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors({allowedHeaders: ['Content-Type', 'Authorization']}));
app.route('/api/v1/oauth')
    .get(WhoAmI(oauth))
    .post(Login(repository, jwt));

app.listen(3000, () =>  asciiArt.font('Cerbero', 'Doom',console.log));

export const server = app;
