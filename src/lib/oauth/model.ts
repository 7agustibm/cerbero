import {OAuthRepository} from '../../repository/repository';

export const model = (jwt: any, repository: OAuthRepository) => {
    return {
        getAccessToken: async (accessToken: string, callback: any) => {
            try {
                const token = jwt.verify(accessToken);
                token.user = await repository.ofUserID(token.user);
                delete token.user.password;
                token.accessTokenExpiresAt = new Date(token.exp * 1000);
                callback(null, token);
            } catch (error) {
                callback(error);
            }
        }
    }
};

// TODO
// generateAccessToken: (client: any, user: any, scope: any, callback: any) => {},
// generateRefreshToken: (client: any, user: any, scope: any, callback: any) => {},
// generateAuthorizationCode: (client: any, user: any, scope: any, callback: any) => {},
// getAuthorizationCode: (authorizationCode: any, callback: any) => {},
// getClient: (clientId: any, clientSecret: any, callback: any) => {},
// saveToken: (token: any, client: any, user: any, callback: any) => {},
// saveAuthorizationCode: (code: any, client: any, user: any, callback: any) => {},
// revokeAuthorizationCode: (code: any, callback: any) => {},
// validateScope: (user: any, client: any, scope: any, callback: any) => {},