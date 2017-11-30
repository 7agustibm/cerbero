import {OAuthRepository} from "../../repository/repository";

export const DeleteUser = (repository: OAuthRepository) => (data: any) => repository.delete(data.id);