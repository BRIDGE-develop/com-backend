import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as userController from '@controllers/user';
import { errorHandler } from '@middlewares/errorHandler';
import asyncErrorHandler from '@util/asyncErrorHandler';

dotenv.config();

// create express server
const app = express();

// express configuration
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app routes
app.post('/v0/user', asyncErrorHandler(userController.postUser));
app.post('/v0/user/token', asyncErrorHandler(userController.postToken));

// error handlers
app.use(errorHandler);

export default app;
