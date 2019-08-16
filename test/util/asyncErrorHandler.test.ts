import asyncErrorHandler from '../../src/util/asyncErrorHandler';

describe('asyncErrorHandler', () => {
    it('operates normally without error', () => {
        const fn = jest.fn(() => Promise.resolve());
        const req: any = {};
        const res: any = {};
        const next: any = {};

        const handler = asyncErrorHandler(fn);
        handler(req, res, next);

        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith(req, res, next);
    });

    it('catches error and send to next funciton with error thrown', async () => {
        const error = Error('must call next');

        const fn = jest.fn(() => Promise.reject(error));
        const req: any = {};
        const res: any = {};
        const next = jest.fn();

        await asyncErrorHandler(fn)(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
    });
});
