import authenticate from '../../src/middlewares/authenticate';
import { sign } from '../../src/util/jwt';

describe('authenticate', () => {
    it('never authenticate GET method', () => {
        const req: any = {
            method: 'GET',
        };
        const res: any = {};
        const next = jest.fn();

        authenticate(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('never authenticates OPTION method', () => {
        const req: any = {
            method: 'OPTION',
        };
        const res: any = {};
        const next = jest.fn();

        authenticate(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('never authenticates POST method with path /v0/user/token', () => {
        const req: any = {
            method: 'POST',
            path: '/v0/user/token',
        };
        const res: any = {};
        const next = jest.fn();

        authenticate(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('respones with status 401 without token', () => {
        const req: any = {
            method: 'POST',
            path: 'dummy path',
            cookies: { jwt: undefined },
        };
        const res: any = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next = jest.fn();

        authenticate(req, res, next);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ error: 'jwt must exist' });
    });

    it('verifies token and insert payload to req.user', () => {
        const user = {
            email: 'ex@ex.com',
            is_admin: 0,
        };

        const jwt = sign(user as any);

        const expectedPayload = {
            iat: expect.anything(),
            iss: 'http://www.bridgejp.net',
            sub: user.email,
            admin: user.is_admin,
        };

        const req: any = {
            method: 'POST',
            path: 'dummy path',
            cookies: { jwt },
        };
        const res: any = {};

        const next = jest.fn();

        authenticate(req, res, next);

        expect(req.user).toEqual(expectedPayload);
        expect(next).toHaveBeenCalledTimes(1);
    });
});
