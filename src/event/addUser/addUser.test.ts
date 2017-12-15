import {AddUser} from "./addUser";
import {OAuthRepository} from "../../repository/repository";
import * as assert from "assert";
import {spy, SinonSpy} from "sinon";
import {OAuthEntity} from "../../entity/oauth";


suite('Unit Test - Event - Add User', () => {

    test('happy path', async () => {
        const repository = {} as OAuthRepository;
        (repository as any).save = spy();
        const data = {} as OAuthEntity;
        AddUser(repository)(data);

        assert((repository.save as SinonSpy).calledWith(data));
    });

});
