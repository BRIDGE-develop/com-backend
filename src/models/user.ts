import connectDB from '@util/dbConnect';
import moment from 'moment';

export interface User {
    email: string;
    password: string;
    is_admin: 0 | 1;
    em_name: string;
    gender: 'M' | 'F';
    contact_number?: string;
    date_created?: string;
    date_updated?: string;
}

export const create = async (user: User) => {
    const connection = await connectDB();

    const result = await connection.query('INSERT INTO employees SET ?', user);

    return result;
};

export const read = async (email: string): Promise<User> => {
    const connection = await connectDB();

    const [user] = await connection.query('SELECT * FROM employees WHERE email = ?', [email]);

    return user;
};

export const update = async (user: User) => {
    const connection = await connectDB();

    const result = await connection.query(
        'UPDATE employees SET email = ?, password = ?, is_admin = ?, em_name = ?, gender = ?, contact_number = ?, updated_at = ?  WHERE email = ?',
        [
            user.email,
            user.password,
            user.is_admin,
            user.em_name,
            user.gender,
            user.contact_number,
            moment.utc(),
            user.email,
        ]
    );

    return result;
};

export const destroy = async (email: string): Promise<User> => {
    const connection = await connectDB();

    const result = await connection.query('DELETE FROM employees WHERE email = ?', [email]);

    return result;
};
