import moment from 'moment';
import jwt from 'jsonwebtoken';

import { User } from '@models/user';

export const sign = (user: User) => {
    const options = { algorithm: 'RS512' };

    const payload = {
        iss: 'http://www.bridgejp.net',
        sub: user.email,
        exp: moment().unix() + 60 * 60 * 5,
        admin: user.is_admin,
    };

    console.log(process.env.JWT_PRIVATE_KEY);
    return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, options);
};

export const verify = (token: string) => {
    const options = { algorithms: ['RS512'] };

    jwt.verify(token, process.env.JWT_PUBLIC_KEY, options);
};
