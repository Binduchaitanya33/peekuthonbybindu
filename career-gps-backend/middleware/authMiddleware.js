import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("Header received:", authHeader);

    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    console.log("Token extracted:", token);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("JWT verify error:", err.message);
            return res.status(403).json({ message: "Invalid token" });
        }

        console.log("Decoded token:", decoded);
        req.userId = decoded.id;
        next();
    });
};
