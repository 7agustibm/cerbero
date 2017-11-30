import {defineSupportCode} from "cucumber";
import * as chai from 'chai';
import {expect} from 'chai';
import {server} from "../../../src/main";
const chaiHttp = require('chai-http');
chai.use(chaiHttp)
const request = (chai as any).request;

defineSupportCode(function ({Given, Then, When}) {
    Given(/^an incorrect token$/, function () {
        this.token = '';
    });

    When(/^I make the request the Who am I$/, function () {
        this.petition = request(server)
            .get('/api/v1/oauth')
            .set('authorization', 'Bearer ' + this.token);
    });

    Then(/^return data$/, function (callback) {
        this.petition
            .then( (res: any) => {
                (expect(res).to.have as any).status(200);
                expect(res.body.user).to.be.not.null;
                (callback as any)();
            })
            .catch((callback as any));
    });

    Then(/^return unauthorized$/, function (callback) {
        this.petition
            .catch((error: any) => {
                (expect(error.response).to.have as any).status(401);
                (callback as any)();
            });
    });
});