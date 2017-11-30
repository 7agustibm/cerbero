import * as express from "express";
import {stub, spy, SinonSpy} from "sinon";
import * as assert from "assert";
import {WhoAmI} from "./whoAmI";

const {Request, Response} = require('oauth2-server');

suite('Unit Test - Controller - Who Am I', () => {
    const token = 'token';

    test('happy path', async () => {
        const oauth = {
            authenticate: stub().returns(Promise.resolve(token))
        };
        const request = {
            method: 'GET',
            headers: {},
            query: {}
        } as express.Request;
        const response = {} as express.Response;
        (response as any).send = spy();
        await WhoAmI(oauth)(request, response);
        assert(oauth.authenticate.calledWith(new Request(request), new Response(response)), 'Authenticate & return token');
        assert((response.send as SinonSpy).calledWith(token), 'Send token');
    });

    test('Invalid user', async () => {
        const oauth = {
            authenticate: stub().throws()
        };
        const request = {
            method: 'GET',
            headers: {},
            query: {}
        } as express.Request;
        const response = {} as express.Response;
        (response as any).send = spy();
        (response as any).status = stub().returns(response);
        await WhoAmI(oauth)(request, response);

        assert((response.status as SinonSpy).calledWith(401), 'Send 401 status code');
        assert((response.send as SinonSpy).calledWith('Unauthorized'), 'Send Unauthorized');
    });
});
