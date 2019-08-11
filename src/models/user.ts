import connectDB from '@util/dbConnect';

interface User {
    email: string;
    password: string;
    em_name: string;
    gender: 'M' | 'F';
    contact_number?: string;
    date_created?: string;
}

export const create = async (values: User) => {
    const connection = await connectDB();

    const result = await connection.query('INSERT INTO employees SET ?', values);

    return result;
};

export const read = async (email: string) => {
    const connection = await connectDB();

    const [user] = await connection.query('SELECT * FROM employees WHERE email = ?', [email]);

    return user;
};
