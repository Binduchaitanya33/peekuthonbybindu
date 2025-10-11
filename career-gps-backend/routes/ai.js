import express from "express";
import axios from "axios";

const router = express.Router();

// This sends data to the AI model (like skills, cgpa, etc.)
router.post("/predict", async (req, res) => {
    try {
        const response = await axios.post("http://localhost:5001/predict", req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "AI server error", error: error.message });
    }
});

export default router;
