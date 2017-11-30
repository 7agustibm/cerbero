import {RepositoryFactory} from './repository/factory';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {JWT, Oauth} from "./lib";
import {WhoAmI,Login} from "./controler";
import {OAuthRepository} from "./repository/repository";
import morgan = require("morgan");
import 'sqlite3';
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
app.use(function (request: express.Request, response: express.Response, next: express.NextFunction) {

    // Website you wish to allow to connect
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, authentication');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', 'false');

    // Pass to next layer of middleware
    next();
});
app.route('/api/v1/oauth')
    .get(WhoAmI(oauth))
    .post(Login(repository, jwt));

app.listen(3000, () =>  asciiArt.font('Cerbero', 'Doom',console.log));

export const server = app;
