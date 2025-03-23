import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User';


export const register = async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, fullName, password } = req.body;

    try {
        let user = await User.findOne({ email: email.toLowerCase() });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ name, email: email.toLowerCase(), fullName, password });

        // Save user to database (password is hashed in the pre-save middleware)
        await user.save();

        // Generate JWT token
        const payload = { user: { id: user.id, email: user.email.toLocaleLowerCase(), fullName: user.fullName } };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export const login = async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, fullName } = req.body;

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
        const payload = { user: { id: user.id, email: user.email, fullName: user.fullName } };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
