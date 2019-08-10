import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

dotenv.config();

// create express server
const app = express();

// express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app routes
// app.post("/login", userController.login);

export default app;
