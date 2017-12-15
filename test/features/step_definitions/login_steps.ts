import {defineSupportCode} from "cucumber";
import * as chai from 'chai';
import {expect} from 'chai';
import {server} from "../../../src/main";
const chaiHttp = require('chai-http');
chai.use(chaiHttp)
const request = (chai as any).request;
const user = 'user';
const password = 'password';

defineSupportCode(function ({Given, Then, When}) {
    Given(/^a correct user$/, function (callback) {
        this.user = { user, password };
        const bus = require('servicebus').bus();
        bus.publish('AddUser', {user, password, id: 'uuid'});
        setTimeout((callback as any), 500);
    });

    Given(/^an incorrect user$/, function () {
        this.user = { user: '2', password };
    });

    When(/^I login$/, function () {
        this.petition = request(server)
            .post('/api/v1/oauth')
            .send(this.user);
    });

    Then(/^return token$/, function (callback) {
        this.petition
            .then( (res: any) => {
                (expect(res).to.have as any).status(200);
                expect(res.body.token).to.be.a('string');
                this.token = res.body.token;
                (callback as any)();
            })
            .catch((callback as any));
    });

    Then(/^return error/, function (callback) {
        this.petition
            .catch((error: any) => {
                (expect(error.response).to.have as any).status(400);
                (callback as any)();
            });
    });
});