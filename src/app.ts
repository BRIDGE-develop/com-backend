import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { errorHandler } from '@middlewares/errorHandler';
import authenticate from '@middlewares/authenticate';
import * as validator from '@middlewares/validator';
import asyncErrorHandler from '@util/asyncErrorHandler';
import * as userController from '@controllers/user';

// configure dotenv
dotenv.config();

// create express server
const app = express();

// express configuration
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// custom middlewares
app.use(authenticate);

// app routes
app.post('/v0/user', validator.postUserValidator, asyncErrorHandler(userController.postUser));
app.post(
    '/v0/user/token',
    validator.postTokenValidator,
    asyncErrorHandler(userController.postToken)
);

// error handlers
app.use(errorHandler);

export default app;
