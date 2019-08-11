import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import * as userController from '@controllers/user';

dotenv.config();

// create express server
const app = express();

// express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app routes
app.post('/v0/user', userController.postUser);
app.post('/v0/user/token', userController.postToken);

export default app;
