import {DeleteUser} from "./deleteUser";
import {OAuthRepository} from "../../repository/repository";
import * as assert from "assert";
import {spy, SinonSpy} from "sinon";


suite('Unit Test - Event - Add User', () => {

    test('happy path', async () => {
        const repository = {} as OAuthRepository;
        (repository as any).delete = spy();
        const data = {
            id: 'id'
        };
        DeleteUser(repository)(data);

        assert((repository.delete as SinonSpy).calledWith(data.id));
    });

});
