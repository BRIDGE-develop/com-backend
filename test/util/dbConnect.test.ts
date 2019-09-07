import connectDB, { db } from '../../src/util/dbConnect';
import mysql from 'promise-mysql';
jest.mock('promise-mysql', () => ({
    createConnection: jest.fn(() => 'dummy mysql.Connection'),
}));

describe('connectDB', () => {
    it('creates db connection', async () => {
        (db as any) = await connectDB();
        expect(db).toBe('dummy mysql.Connection');

        expect(mysql.createConnection).toHaveBeenCalledTimes(1);
        expect(mysql.createConnection).toHaveBeenCalledWith({
            host: process.env.RDS_HOST,
            user: process.env.RDS_USER,
            password: process.env.RDS_PASSWORD,
            database: process.env.RDS_DATABASE,
        });
    });

    it('returns db connection without creating a new one', async () => {
        const connection = await connectDB();
        expect(connection).toBe('dummy mysql.Connection');

        (mysql.createConnection as jest.Mock).mockClear();
        expect(mysql.createConnection).toHaveBeenCalledTimes(0);
    });
});
