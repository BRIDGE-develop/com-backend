import { errorHandler } from '../../src/middlewares/errorHandler';
import logger from '../../src/util/logger';

describe('errorHandler', () => {
    it('handles error', () => {
        (logger as any) = { error: jest.fn() };

        const err: any = { stack: 'dummy stack', message: 'dummy error' };
        const req: any = {};
        const res: any = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next: any = {};

        errorHandler(err, req, res, next);

        expect(logger.error).toHaveBeenCalledTimes(1);
        expect(logger.error).toHaveBeenCalledWith(err.stack);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ error: err.message });
    });
});
