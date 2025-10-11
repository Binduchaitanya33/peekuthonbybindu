import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import Job from "../models/job.js";

const router = express.Router();

// GET all jobs from MongoDB
router.get("/", verifyToken, async (req, res) => {
    try {
        const jobs = await Job.find(); // Fetch jobs from the database
        res.json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Error fetching jobs" });
    }
});

export default router;
