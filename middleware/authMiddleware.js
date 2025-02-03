const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes (ensure user is authenticated)
exports.protect = async (req, res, next) => {
    let token;

    // Check if Authorization header exists and starts with 'Bearer'
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Extract token from Authorization header
            token = req.headers.authorization.split(" ")[1];

            if (!token) {
                return res.status(401).json({ message: "Access denied, token missing" });
            }

            // Check if JWT_SECRET is defined
            if (!process.env.JWT_SECRET) {
                console.error("Error: JWT_SECRET is missing in environment variables.");
                return res.status(500).json({ message: "Server error, missing JWT secret" });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Token:", decoded); // Debugging

            // Fetch user from DB and attach to req.user
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "Access denied, user not found" });
            }

            next();
        } catch (error) {
            console.error("Error verifying token:", error.message);
            return res.status(401).json({ message: "Access denied, invalid or expired token" });
        }
    } else {
        console.log("Error: Authorization header is missing.");
        return res.status(401).json({ message: "Access denied, no token provided" });
    }
};

// Middleware to allow only admins to access certain routes
exports.admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied, admin only" });
    }
};
