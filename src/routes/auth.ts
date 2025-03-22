import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User';

const router = express.Router();

// @route POST /api/auth/register
// @desc Register a new user
router.post(
    '/register',
    [
        body('name', 'Name is required').notEmpty(),
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    async (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email: email.toLowerCase() });
            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            user = new User({ name, email: email.toLowerCase(), password });

            // Save user to database (password is hashed in the pre-save middleware)
            await user.save();

            // Generate JWT token
            const payload = { user: { id: user.id } };
            const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

            res.json({ token });
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);
// @route POST /api/auth/login
// @desc Authenticate user and get token
router.post(
    '/login',
    [
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password is required').exists(),
    ],
    async (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email: email.toLowerCase() });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            // Check if the entered password matches the hashed password in the database
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            // Generate JWT token
            const payload = { user: { id: user.id } };
            const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

            res.json({ token });
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

export default router;
