import { Request, Response, NextFunction } from 'express';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'POST' && req.path.split('/').pop() === 'token') return next();

    if (!req.cookies['jwt']) res.status(401).json({ message: 'The jwt must exist' });
};

export default authenticate;
