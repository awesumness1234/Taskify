import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Register user (username & password only)
async function registerUser(req, res) {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: 'Username already exists' });
        }

        const user = new User({ username, password });
        await user.save();
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error', error: err.message });
    }
}

// Login user
async function loginUser(req, res) {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: "Authentication failed" });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'default_secret_key',
            { expiresIn: '1h' }
        );

        res.status(200).send({
            userId: user._id,
            username: user.username,
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error', error: err.message });
    }
}

const AuthController = {
    registerUser,
    loginUser
};

export default AuthController;
