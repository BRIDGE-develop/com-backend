import fetch from 'node-fetch';
import bcrypt from 'bcrypt';
import { create, read } from '../../src/models/user';
import server from '../../src/index';

beforeAll(() => {
    (create as any) = jest.fn(() => 'dummy result');
    (read as any) = jest.fn();
});

afterAll(() => {
    server.close();
});

beforeEach(() => {
    (create as jest.Mock).mockClear();
    (read as jest.Mock).mockClear();
});

describe('postUser', () => {
    it('responses with status code 422 if validation fails', async () => {
        const body = {
            email: 'example',
            password: 'password',
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch(
            `http://localhost:${process.env.SERVER_PORT}/v0/user`,
            options
        );

        expect(response.status).toBe(422);
        expect(await response.json()).toEqual(expect.anything());
    });

    it('responses with status code 200 receiving normal request', async () => {
        const body = {
            email: 'admin@example.com',
            password: 'password',
            is_admin: '1',
            em_name: 'Jinseop Lee',
            gender: 'M',
            contact_number: '080-00000-0000',
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch(
            `http://localhost:${process.env.SERVER_PORT}/v0/user`,
            options
        );

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual({ message: `${body.email} is created` });

        expect(create).toHaveBeenCalledTimes(1);
        expect(create).toHaveBeenCalledWith({ ...body, password: expect.anything() });
    });
});

describe('postToken', () => {
    it('responses with status code 422 if validation fails', async () => {
        const body = {
            email: 'example',
            password: '',
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch(
            `http://localhost:${process.env.SERVER_PORT}/v0/user/token`,
            options
        );

        expect(response.status).toBe(422);
        expect(await response.json()).toEqual(expect.anything());
    });

    it('responses with status code 404 if the user does not exist', async () => {
        const body = {
            email: 'admin@example.com',
            password: 'password',
            is_admin: '1',
            em_name: 'Jinseop Lee',
            gender: 'M',
            contact_number: '080-00000-0000',
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch(
            `http://localhost:${process.env.SERVER_PORT}/v0/user/token`,
            options
        );

        expect(response.status).toBe(404);
        expect(await response.json()).toEqual({ error: `${body.email} does not exist` });
    });

    it('responses with status code 401 if password is incorrect', async () => {
        const body = {
            email: 'admin@example.com',
            password: 'password',
            is_admin: '1',
            em_name: 'Jinseop Lee',
            gender: 'M',
            contact_number: '080-00000-0000',
        };

        (read as jest.Mock).mockReturnValue({
            email: body.email,
            password: await bcrypt.hash('wrong password', 10),
        });

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch(
            `http://localhost:${process.env.SERVER_PORT}/v0/user/token`,
            options
        );

        expect(response.status).toBe(401);
        expect(await response.json()).toEqual({ error: `${body.email}'s password is incorrect` });
    });

    it('responses with status code 200 with jwt cookie', async () => {
        const body = {
            email: 'admin@example.com',
            password: 'password',
            is_admin: '1',
            em_name: 'Jinseop Lee',
            gender: 'M',
            contact_number: '080-00000-0000',
        };

        (read as jest.Mock).mockReturnValue({
            email: body.email,
            password: await bcrypt.hash('password', 10),
            is_admin: body.is_admin,
        });

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch(
            `http://localhost:${process.env.SERVER_PORT}/v0/user/token`,
            options
        );

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual({
            email: body.email,
            admin: body.is_admin,
            expiredAt: expect.anything(),
        });
        expect(response.headers.raw()['set-cookie']).toEqual(expect.anything());
    });
});
