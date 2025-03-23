import { body } from 'express-validator';
import express, { Request, Response } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = express.Router();

// @route POST /api/auth/register
// @desc Register a new user
router.post(
    '/register',
    [
        body('fullName', 'Name is required').notEmpty(),
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    register
);
// @route POST /api/auth/login
// @desc Authenticate user and get token
router.post(
    '/login',
    [
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password is required').exists(),
    ],
    login
);

export default router;
