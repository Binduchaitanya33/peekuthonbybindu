import express from "express";
const router = express.Router();

const materials = [
    { topic: "React Basics", link: "https://react.dev/learn" },
    { topic: "Machine Learning", link: "https://www.coursera.org/learn/machine-learning" },
    { topic: "Career Growth Tips", link: "https://www.linkedin.com/learning" },
];

router.get("/", (req, res) => res.json(materials));

export default router;
