import mysql from 'promise-mysql';

let db: mysql.Connection;

const connectDB = async () => {
    return db
        ? db
        : await mysql.createConnection({
              host: process.env.RDS_HOST,
              user: process.env.RDS_USER,
              password: process.env.RDS_PASSWORD,
              database: process.env.RDS_DATABASE,
          });
};
export default connectDB;
