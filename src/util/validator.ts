import { body } from 'express-validator';

export const postUserValidator = [
    body('email', 'email is not valid').isEmail(),
    body('password', 'password cannot be blank').isLength({ min: 1 }),
    body('is_admin', 'is_admin should be 0 or 1').isInt({ min: 0, max: 1 }),
    body('em_name', 'em_name cannot be blank')
        .not()
        .isEmpty(),
    body('gender', 'gender should be M or F').isWhitelisted(['M', 'F']),
];

export const postTokenValidator = [
    body('email', 'email is not valid').isEmail(),
    body('password', 'password cannot be blank')
        .not()
        .isEmpty(),
];
