import Job from "../models/job.js";

export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching jobs" });
    }
};
