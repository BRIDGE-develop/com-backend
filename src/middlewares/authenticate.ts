import { Request, Response, NextFunction } from 'express';
import { verify } from '@util/jwt';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const { method, path, cookies } = req;

    if (
        method === 'GET' ||
        method === 'OPTION' ||
        (method === 'POST' && path.split('/').pop() === ('token' || 'user'))
    )
        return next();

    if (!cookies.jwt) return res.status(401).json({ error: 'jwt must exist' });

    const decodedToken = verify(cookies.jwt);
    req.user = decodedToken;
    next();
};

export default authenticate;
