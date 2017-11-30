import * as express from "express";
const {Request, Response} = require('oauth2-server');

export const WhoAmI = (oauth: any) => async (request: express.Request, response: express.Response) => {
    try {
        const token = await oauth.authenticate(new Request(request), new Response(response));
        response.send(token);
    } catch (error) {
        // console.error(error);
        response.status(401).send('Unauthorized');
    }
}