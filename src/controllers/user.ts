import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import * as userModel from '@models/user';
import logger from '@util/logger';
import { sign } from '@util/jwt';

export const postUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error(errors.array());
        return res.status(422).json({ error: errors.array() });
    }

    const user = req.body;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const result = await userModel.create({ ...user, password: hashedPassword });

    logger.info(`${user.email} created`, result);
    return res.json({ message: `${user.email} is created` });
};

export const postToken = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error(errors.array());
        return res.status(422).json({ error: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.read(email);
    if (!user) return res.status(404).json({ error: `${email} does not exist` });

    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame) return res.status(401).json({ error: `${user.email}'s password is incorrect` });

    const jwt = sign(user);
    // TODO: add secure: true option for Production use.
    res.cookie('jwt', jwt, { httpOnly: true, maxAge: 1000 * 60 * 60 * 5 });
    return res.json({ message: `${user.email} is signed in` });
};
