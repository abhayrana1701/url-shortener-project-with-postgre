"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = __importDefault(require("../config/data-source")); // Import the global data source
const user_1 = require("../entity/user");
const JWT_SECRET = "r9j5$w2wQ2nd!Bk7d28ZdA8Gtf8$6%G98D85vpt2dF6d6vMy3K8p";
const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ error: "Access denied, no token provided" });
    }
    try {
        // Decode the token to get the user ID
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Attach user ID to request object
        req.userId = decoded.userId;
        // Optionally, you can validate the user existence from the database if needed
        const userRepository = data_source_1.default.getRepository(user_1.User); // Assuming you have a User entity
        const user = await userRepository.findOne({ where: { id: decoded.userId } });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        // Proceed to the next middleware if user exists
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map