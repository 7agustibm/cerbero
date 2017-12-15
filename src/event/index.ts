import {OAuthRepository} from "../repository/repository";
import {AddUser} from "./addUser/addUser";
import {DeleteUser} from "./deleteUser/deleteUser";

const bus = require('servicebus').bus();
bus.use(bus.logger({log: console.log}));

export const Event = (repository: OAuthRepository) => {
    bus.subscribe('AddUser', AddUser(repository));
    bus.subscribe('DeleteUser', DeleteUser(repository));
}
