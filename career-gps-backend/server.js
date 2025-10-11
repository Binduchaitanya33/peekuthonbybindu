import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";
import mentorRoutes from "./routes/mentors.js";
import materialRoutes from "./routes/materials.js";
import aiRoutes from "./routes/ai.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'https://peekuthonbybindu.onrender.com', 'https://peekuthonbybindu.vercel.app'],  // Explicitly match the frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,  // Allow credentials
}));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({
        message: 'Server error occurred',
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// ✅ MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // timeout fix
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // Stop the server if DB connection fails
    }
};

connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/ai", aiRoutes);

// Default Route
app.get("/", (req, res) => res.send("🚀 Career GPS Backend is Running Successfully!"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server started on http://localhost:${PORT}`));
