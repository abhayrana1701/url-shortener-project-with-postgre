"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUrl = exports.getUserUrls = exports.getUrlAnalytics = exports.trackAnalytics = exports.findOriginalUrl = exports.createShortUrl = void 0;
const data_source_1 = __importDefault(require("../config/data-source")); // Import the global data source
const url_1 = require("../entity/url");
const urlanalytics_1 = require("../entity/urlanalytics");
const crypto_1 = __importDefault(require("crypto"));
const useragent_1 = __importDefault(require("useragent"));
const axios_1 = __importDefault(require("axios"));
/**
 * Utility function to generate a unique hash for the URL.
 * @param {number} length - The length of the hash to generate (default is 6).
 * @returns {string} The generated hash.
 */
const generateShortHash = (length = 6) => {
    return crypto_1.default.randomBytes(length).toString("hex").slice(0, length);
};
/**
 * Service to create a shortened URL.
 * @param {string} originalUrl - The original URL to shorten.
 * @param {Date | null} expirationDate - The expiration date for the shortened URL, if any.
 * @param {string} userId - The ID of the user creating the shortened URL.
 * @returns {Promise<Object>} The created shortened URL object.
 */
const createShortUrl = async (originalUrl, expirationDate, userId) => {
    const shortHash = generateShortHash();
    // Get the Url repository from the globally initialized data source
    const urlRepository = data_source_1.default.getRepository(url_1.Url);
    const newUrl = urlRepository.create({
        originalUrl,
        shortHash,
        expirationDate,
        userId,
    });
    await urlRepository.save(newUrl);
    return newUrl;
};
exports.createShortUrl = createShortUrl;
/**
 * Service to find the original URL based on the short hash.
 * @param {string} shortHash - The shortened hash to lookup.
 * @returns {Promise<Object | null>} The original URL object or null if not found.
 */
const findOriginalUrl = async (shortHash) => {
    // Get the Url repository from the globally initialized data source
    const urlRepository = data_source_1.default.getRepository(url_1.Url);
    const url = await urlRepository.findOne({ where: { shortHash } });
    return url || null;
};
exports.findOriginalUrl = findOriginalUrl;
/**
 * Function to track the analytics for a URL visit.
 * @param {string} urlId - The ID of the URL being visited.
 * @param {string} ipAddress - The IP address of the visitor.
 * @param {string} userAgentString - The User-Agent string of the visitor.
 * @returns {Promise<void>} A promise that resolves when the tracking is complete.
 */
const trackAnalytics = async (urlId, ipAddress, userAgentString) => {
    try {
        // Get the Url repository from the globally initialized data source
        const urlRepository = data_source_1.default.getRepository(url_1.Url);
        // Find the URL by ID
        const url = await urlRepository.findOne({ where: { id: urlId } });
        if (url) {
            // Increment the visit count
            url.visitCount += 1;
            await urlRepository.save(url); // Save the updated URL
        }
        const agent = useragent_1.default.parse(userAgentString);
        const browser = agent.toAgent();
        const device = agent.device.toString();
        const location = await getLocationFromIP(ipAddress);
        // Get the UrlAnalytics repository from the globally initialized data source
        const analyticsRepository = data_source_1.default.getRepository(urlanalytics_1.UrlAnalytics);
        const analytics = analyticsRepository.create({
            urlId,
            browser,
            device,
            location,
        });
        await analyticsRepository.save(analytics);
    }
    catch (err) {
        console.error("Error tracking analytics:", err);
    }
};
exports.trackAnalytics = trackAnalytics;
/**
 * Helper function to get location from the IP address.
 * @param {string} ipAddress - The IP address of the visitor.
 * @returns {Promise<string>} The location of the visitor as a string (city, region, etc.).
 */
const getLocationFromIP = async (ipAddress) => {
    try {
        const response = await axios_1.default.get(`http://ip-api.com/json/${ipAddress}`);
        return response.data && response.data.city ? response.data.city : "Unknown Location";
    }
    catch (err) {
        console.error("Error getting location:", err);
        return "Unknown Location";
    }
};
/**
 * Service to get the analytics data for a URL.
 * @param {string} shortHash - The short hash of the URL to fetch analytics for.
 * @returns {Promise<Object>} An object containing visit count and analytics data, or an error message.
 */
const getUrlAnalytics = async (shortHash) => {
    try {
        // Get the Url repository from the globally initialized data source
        const urlRepository = data_source_1.default.getRepository(url_1.Url);
        const url = await urlRepository.findOne({ where: { shortHash } });
        if (!url) {
            return { error: "URL not found" };
        }
        // Get the UrlAnalytics repository from the globally initialized data source
        const analyticsRepository = data_source_1.default.getRepository(urlanalytics_1.UrlAnalytics);
        const analyticsData = await analyticsRepository.find({ where: { urlId: url.id } });
        if (analyticsData.length === 0) {
            return { error: "No analytics data available for this URL" };
        }
        return {
            visitCount: url.visitCount,
            analytics: analyticsData,
        };
    }
    catch (err) {
        console.error("Error retrieving analytics data:", err);
        return { error: "Error retrieving analytics data" };
    }
};
exports.getUrlAnalytics = getUrlAnalytics;
/**
 * Service to get all URLs for a specific user.
 * @param {string} userId - The ID of the user to fetch URLs for.
 * @returns {Promise<Object[]>} A list of URLs associated with the user, or an error message.
 */
const getUserUrls = async (userId) => {
    try {
        // Get the Url repository from the globally initialized data source
        const urlRepository = data_source_1.default.getRepository(url_1.Url);
        const userUrls = await urlRepository.find({ where: { userId } });
        if (userUrls.length === 0) {
            return { error: "No URLs found for this user" };
        }
        return userUrls;
    }
    catch (err) {
        console.error("Error retrieving URLs for the user:", err);
        return { error: "Error retrieving user URLs" };
    }
};
exports.getUserUrls = getUserUrls;
/**
 * Service to delete a URL for a specific user by shortHash.
 * @param {string} hash - The short hash of the URL to delete.
 * @returns {Promise<Object>} A success or error message based on the outcome of the deletion.
 */
const deleteUrl = async (hash) => {
    try {
        // Get the Url repository from the globally initialized data source
        const urlRepository = data_source_1.default.getRepository(url_1.Url);
        // Find the URL by its shortHash
        const url = await urlRepository.findOne({ where: { shortHash: hash } });
        if (!url) {
            return { error: "URL not found or you do not have permission to delete it" };
        }
        // Remove the found URL
        await urlRepository.remove(url);
        return { success: "URL deleted successfully" };
    }
    catch (err) {
        console.error("Error deleting URL:", err);
        return { error: "Error deleting URL" };
    }
};
exports.deleteUrl = deleteUrl;
//# sourceMappingURL=url.service.js.map