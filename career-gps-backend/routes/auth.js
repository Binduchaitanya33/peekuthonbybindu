import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Make sure User model is created
import dotenv from "dotenv";
import { verifyToken } from "../middleware/authMiddleware.js";


dotenv.config();
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    try {
        console.log('Registration attempt:', { ...req.body, password: '****' });
        const { name, email, password, role } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide all required fields",
                missing: {
                    name: !name,
                    email: !email,
                    password: !password
                }
            });
        }

        // 1️⃣ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // 2️⃣ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3️⃣ Save new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'student' // default to student if role not provided
        });

        console.log('Attempting to save user...');
        await user.save();
        console.log('User saved successfully');

        // 4️⃣ Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(201).json({
            message: "Registration successful! You can now log in.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: "Registration failed",
            error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});


// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2️⃣ Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // 3️⃣ Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // 4️⃣ Send response
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


export default router;
