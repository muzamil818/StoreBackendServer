import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    try {
        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = header.split(" ")[1]; // "Bearer token"

        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        res.status(401).json({ message: "Invalid or expired token" });
    }
}
