import {model} from './model';
import {SinonStub, spy, stub} from 'sinon';
import * as assert from "assert";
import { OAuthRepository } from '../../repository/repository';

suite('Unit Test - Lib - OAuth', () => {
    const repository = {} as OAuthRepository;
    const exp = new Date().getTime()/1000;
    const user = {};
    const token = {
        user: '',
        exp: parseInt(exp.toString())
    };

    suite('getAccessToken', () => {
       test('happy path', async () => {
           const tokenExpected = Object.assign({}, token);
           (tokenExpected.user as any) = user;
           (tokenExpected as any).accessTokenExpiresAt = new Date(token.exp * 1000);
           const jwt = {
               verify: stub().returns(Object.assign({}, token))
           };
           const accessToken = 'accessToken';
           const callback = spy();
           (repository as any).ofUserID =  stub().returns(Promise.resolve(user));
           await model(jwt, repository).getAccessToken(accessToken, callback);
           assert(jwt.verify.calledWith(accessToken), 'Verify token');
           assert((repository.ofUserID as SinonStub).calledWith(token.user), 'Get user');
           assert(callback.calledWith(null, tokenExpected), 'Call back return token data');
       });

       test('it\'s not correct token.', async () => {
           const error = {};
           const jwt = {
               verify: stub().throws(error)
           };
           const accessToken = 'accessToken';
           const callback = spy();
           await model(jwt, repository).getAccessToken(accessToken, callback);
           assert(jwt.verify.calledWith(accessToken), 'Verify token');
           assert(callback.calledWith(error), 'Call back return error');
       });

        test('it\'s not correct user id.', async () => {
            const error = {};
            const jwt = {
                verify: stub().returns(Object.assign({}, token))
            };
            const accessToken = 'accessToken';
            const callback = spy();
            (repository as any).ofUserID =  stub().returns(Promise.reject(error));
            await model(jwt, repository).getAccessToken(accessToken, callback);
            assert(jwt.verify.calledWith(accessToken), 'Verify token');
            assert((repository.ofUserID as SinonStub).calledWith(token.user), 'Get user');
            console.log(callback.args);
            assert(callback.calledWith(error), 'Call back return error');
        });
   });
});