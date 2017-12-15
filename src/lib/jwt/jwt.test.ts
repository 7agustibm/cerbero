import {JWT} from './';
import * as assert from "assert";
const jwt = require('jsonwebtoken');

suite('Unit Test - Lib - JWT', () => {
    const payload = {};
    const secret = 'secret';
    const roles = ['1h'];
    const role = 0;

    suite('Sign', () => {
        test('Sign', () => {
          const token = JWT(secret).sign(payload);
          assert.equal(token, jwt.sign(payload, secret, {expiresIn: '30m'}));
        });

        test('add role', () => {
            const token = JWT(secret,roles).sign(payload, role);
            assert.equal(token, jwt.sign(payload, secret, { expiresIn: roles[role] }));
        });
    });

    test('verify', () => {
        const token = jwt.sign(payload, secret);
        assert.deepEqual(jwt.verify(token, secret), JWT(secret).verify(token));
    });
});
