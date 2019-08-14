import { Request, Response, NextFunction } from 'express';
import logger from '../util/logger';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err.stack);
    res.status(500).json({ error: err.message });
};
