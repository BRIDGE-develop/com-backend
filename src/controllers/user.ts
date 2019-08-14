import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as userModel from '@models/user';
import logger from '@util/logger';
import { sign } from '@util/jwt';

export const postUser = async (req: Request, res: Response) => {
    const { user } = req.body;

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const result = await userModel.create({ ...user, password: hashedPassword });

    logger.info(`${user.email} created`, result);

    res.json({ message: `${user.email} created` });
};

export const postToken = async (req: Request, res: Response) => {
    const { email, password } = req.body.user;

    const user = await userModel.read(email);

    if (!user) res.status(404).json({ message: `${email} not exists.` });

    const isSame = await bcrypt.compare(password, user.password);

    if (!isSame) res.status(401).json({ message: `${user.email}'s password is incorrect` });
    else {
        const jwt = sign(user);
        if (jwt) {
            // TODO: add secure: true option for Production use.
            res.cookie('jwt', jwt, { httpOnly: true, maxAge: 1000 * 60 * 60 * 5 });
            res.json({ message: `${user.email} signed in` });
        }
    }
};
