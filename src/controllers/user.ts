import { Request, Response } from 'express';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';
import * as userModel from '@models/user';
// import logger from '@util/logger';

export const postUser = async (req: Request, res: Response) => {
    const user = req.body;

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const result = await userModel.create({ ...user, password: hashedPassword });

    res.send(result);
};

export const postToken = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { password: hash } = await userModel.read(email);

    const isSame = await bcrypt.compare(password, hash);

    const header = {
        alg: 'HS512',
        typ: 'JWT',
    };

    const payload = {
        jti: uuidv4(),
        iss: 'bridge',
        sub: email,
        exp: moment().unix() + 60 * 60,
        role: 'user',
    };
};
