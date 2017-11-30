import {OAuthRepository} from "../../repository/repository";

export const AddUser: any = (repository: OAuthRepository) => (data: any) => repository.save(data);
