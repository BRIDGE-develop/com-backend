import connectDB from '@util/dbConnect';

interface User {
    email: string;
    password: string;
    em_name: string;
    gender: 'M' | 'F';
    contact_number?: string;
    date_created?: string;
}

export const read = async (email: string) => {
    const connection = await connectDB();

    const [results] = await connection.query('SELECT * FROM `employees` WHERE email = ?', [email]);

    const user: User = {
        email: results.email,
        password: results.password,
        em_name: results.em_name,
        gender: results.gender,
        contact_number: results.contact_number,
        date_created: results.date_created,
    };
    return user;
};

export const write = async (values: User) => {
    const connection = await connectDB();

    await connection.query(
        'INSERT INTO `employees` (`email`, `password`, `em_name`' +
            ',`gender`, `contact_number`) VALUES(?, ?, ?, ?, ?)' +
            [values.email, values.password, values.em_name, values.gender, values.contact_number]
    );
};
