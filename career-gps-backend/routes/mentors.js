import express from "express";
const router = express.Router();

const mentors = [
    { id: 1, name: "John Doe", expertise: "Web Development", experience: "5 years" },
    { id: 2, name: "Sara Lee", expertise: "AI & Machine Learning", experience: "3 years" },
];

router.get("/", (req, res) => {
    res.json(mentors);
});

export default router;
