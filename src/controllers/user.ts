import { Request, Response } from 'express';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

    if (isSame) {
        const payload = {
            iss: 'bridge',
            sub: email,
            exp: moment().unix() + 60 * 60,
            role: 'user',
        };

        const options = { algorithm: 'RS512' };

        const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, options);

        res.status(200);
        res.json({ token });
    }

    res.json({});
};

const createJWT = () => {};
