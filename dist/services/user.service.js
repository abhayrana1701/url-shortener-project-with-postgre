"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.loginUser = exports.signupUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const data_source_1 = __importDefault(require("../config/data-source")); // Import the global data source
const user_1 = require("../entity/user");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = "r9j5$w2wQ2nd!Bk7d28ZdA8Gtf8$6%G98D85vpt2dF6d6vMy3K8p";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "rewr345cft5yby567nu67u867jn67u6h67";
/**
 * Helper function to generate an access token.
 * @param {string} userId - The ID of the user for which the access token is generated.
 * @returns {string} The generated JWT access token.
 */
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ _id: userId }, JWT_SECRET, { expiresIn: "15m" });
};
/**
 * Helper function to generate a refresh token.
 * @param {string} userId - The ID of the user for which the refresh token is generated.
 * @returns {string} The generated JWT refresh token.
 */
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ _id: userId }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};
/**
 * Service to register a new user.
 * @param {string} email - The email of the user being registered.
 * @param {string} password - The password of the user being registered.
 * @returns {Promise<Object>} An object containing either a success message or an error message.
 */
const signupUser = async (email, password) => {
    try {
        // Get the User repository from the globally initialized data source
        const userRepository = data_source_1.default.getRepository(user_1.User);
        // Check if the user already exists
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            return { error: "User already exists" };
        }
        // // Hash the password before saving
        // const hashedPassword = await bcrypt.hash(password, 12);
        // Create new user and save to DB
        const newUser = userRepository.create({ email, password: password });
        await userRepository.save(newUser);
        return { message: "User registered successfully" };
    }
    catch (error) {
        console.error("Error in signupUser:", error);
        return { error: "Error creating user" };
    }
};
exports.signupUser = signupUser;
/**
 * Service to log in a user.
 * @param {string} email - The email of the user attempting to log in.
 * @param {string} password - The password provided by the user during login.
 * @returns {Promise<Object>} An object containing either a success message, access token, refresh token, or an error message.
 */
const loginUser = async (email, password) => {
    try {
        // Get the User repository from the globally initialized data source
        const userRepository = data_source_1.default.getRepository(user_1.User);
        // Find user by email
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return { error: "Invalid email or password" };
        }
        // Compare password
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return { error: "Invalid email or password" };
        }
        // Generate both access and refresh tokens
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        return { message: "Login successful", accessToken, refreshToken };
    }
    catch (error) {
        console.error("Error in loginUser:", error);
        return { error: "Error logging in" };
    }
};
exports.loginUser = loginUser;
/**
 * Service to refresh the access token using the refresh token.
 * @param {string} refreshToken - The refresh token to use for generating a new access token.
 * @returns {Promise<Object>} An object containing either a new access token or an error message.
 */
const refreshAccessToken = async (refreshToken) => {
    try {
        // Verify the refresh token and decode
        const decoded = jsonwebtoken_1.default.verify(refreshToken, JWT_REFRESH_SECRET);
        // Get the User repository from the globally initialized data source
        const userRepository = data_source_1.default.getRepository(user_1.User);
        // Find user by the decoded ID
        const user = await userRepository.findOne({ where: { id: decoded._id } });
        if (!user) {
            return { error: "Invalid refresh token" };
        }
        // Generate new access token
        const newAccessToken = generateAccessToken(user.id);
        return { newAccessToken };
    }
    catch (error) {
        console.error("Error in refreshAccessToken:", error);
        return { error: "Invalid or expired refresh token" };
    }
};
exports.refreshAccessToken = refreshAccessToken;
//# sourceMappingURL=user.service.js.map