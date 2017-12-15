const jwt = require('jsonwebtoken');

export const JWT = (secret: string, roles: string[] = ['30m']) => {
    return {
        sign: (payload: any, role: number = 0) => jwt.sign(payload, secret, { expiresIn: roles[role]}),
        verify: (token: string) => jwt.verify(token, secret),
    };
};


