"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwner = void 0;
const typeorm_1 = require("typeorm");
const url_1 = require("../entity/url"); // Assuming `Url` is your TypeORM entity
const isOwner = async (req, res, next) => {
    const { hash } = req.params; // The short hash of the URL
    const userId = req.userId; // The user ID from the decoded JWT
    try {
        let url;
        // If hash is provided, check ownership by shortHash
        if (hash) {
            url = await (0, typeorm_1.getRepository)(url_1.Url).findOne({ where: { shortHash: hash } });
        }
        // If no hash is provided, check ownership by userId
        else if (userId) {
            url = await (0, typeorm_1.getRepository)(url_1.Url).findOne({ where: { userId } });
        }
        // If no URL found for either condition, return an error
        if (!url) {
            return res.status(404).json({ error: "URL not found or user does not own any URLs" });
        }
        // Check if the user is the owner, either by hash or userId
        if (url.userId !== userId) {
            return res.status(403).json({ error: "You are not authorized to access this URL" });
        }
        next(); // The user is the owner, continue to the next middleware/controller
    }
    catch (error) {
        return res.status(500).json({ error: "Error checking URL ownership" });
    }
};
exports.isOwner = isOwner;
//# sourceMappingURL=isowner.middleware.js.map