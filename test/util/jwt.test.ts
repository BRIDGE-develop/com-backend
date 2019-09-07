import { sign, verify } from '../../src/util/jwt';

describe('jwt', () => {
    it('signs jwt', () => {
        const user = {
            email: 'ex@ex.com',
            is_admin: 0,
        };

        const jwt = sign(user as any);

        const regExForJwt = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
        expect(jwt).toMatch(regExForJwt);
    });

    it('verifies jwt', () => {
        const user = {
            email: 'ex@ex.com',
            is_admin: 0,
        };

        const expectedPayload = {
            iat: expect.anything(),
            iss: 'http://www.bridgejp.net',
            sub: user.email,
            admin: user.is_admin,
        };

        const jwt = sign(user as any);
        const payload = verify(jwt);
        expect(payload).toEqual(expectedPayload);
    });
});
