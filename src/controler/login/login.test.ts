import {OAuthSQLiteRepository} from "../../repository/sqlite";
import {Login} from "./login";
import * as express from "express";
import {SinonStub, stub, spy, SinonSpy} from "sinon";
import * as assert from "assert";

suite('Unit Test - Controller - Login', () => {
    const password = 'password';
    const token = 'token';

    test('happy path', async () => {
        const repository = {} as OAuthSQLiteRepository;
        const user = {
            id: 'id',
            password
        };
        (repository as any).ofUser = stub().returns(Promise.resolve(user));
        const jwt = {
            sign: stub().returns(token)
        };
        const request = {
            body: {
                user: 'user',
                password
            }
        } as express.Request;
        const response = {} as express.Response;
        (response as any).send = spy();
        await Login(repository,jwt)(request, response);

        assert((repository.ofUser as SinonStub).calledWith(request.body.user), 'Get User');
        assert(jwt.sign.calledWith({user: user.id}), 'Generate token');
        assert((response.send as SinonSpy).calledWith({token}), 'Send token');
    });

    test('Invalid user', async () => {
        const repository = {} as OAuthSQLiteRepository;
        (repository as any).ofUser = stub().returns(Promise.resolve(undefined));
        const jwt = {};
        const request = {
            body: {
                user: 'user',
                password
            }
        } as express.Request;
        const response = {} as express.Response;
        (response as any).send = spy();
        (response as any).status = stub().returns(response);
        await Login(repository,jwt)(request, response);

        assert((repository.ofUser as SinonStub).calledWith(request.body.user), 'Get User');
        assert((response.status as SinonSpy).calledWith(400), 'Send 400 status code');
        assert((response.send as SinonSpy).calledWith('Not exist or invalid!'), 'Send error');
    });

    test('internal error', async () => {
        const repository = {} as OAuthSQLiteRepository;
        (repository as any).ofUser = stub().throws(Error);
        const jwt = {};
        const request = {
            body: {
                user: 'user',
                password
            }
        } as express.Request;
        const response = {} as express.Response;
        (response as any).send = spy();
        (response as any).status = stub().returns(response);
        await Login(repository,jwt)(request, response);

        assert((repository.ofUser as SinonStub).calledWith(request.body.user), 'Get User');
        assert((response.status as SinonSpy).calledWith(500), 'Send 500 status code');
        assert((response.send as SinonSpy).calledWith('Internal error!'), 'Send error');
    });
});
