import { Url } from "../entity/url";
import { UrlAnalytics } from "../entity/urlanalytics";
/**
 * Service to create a shortened URL.
 * @param {string} originalUrl - The original URL to shorten.
 * @param {Date | null} expirationDate - The expiration date for the shortened URL, if any.
 * @param {string} userId - The ID of the user creating the shortened URL.
 * @returns {Promise<Object>} The created shortened URL object.
 */
export declare const createShortUrl: (originalUrl: string, expirationDate: Date | null, userId: string) => Promise<Url>;
/**
 * Service to find the original URL based on the short hash.
 * @param {string} shortHash - The shortened hash to lookup.
 * @returns {Promise<Object | null>} The original URL object or null if not found.
 */
export declare const findOriginalUrl: (shortHash: string) => Promise<Url | null>;
/**
 * Function to track the analytics for a URL visit.
 * @param {string} urlId - The ID of the URL being visited.
 * @param {string} ipAddress - The IP address of the visitor.
 * @param {string} userAgentString - The User-Agent string of the visitor.
 * @returns {Promise<void>} A promise that resolves when the tracking is complete.
 */
export declare const trackAnalytics: (urlId: string, ipAddress: string, userAgentString: string) => Promise<void>;
/**
 * Service to get the analytics data for a URL.
 * @param {string} shortHash - The short hash of the URL to fetch analytics for.
 * @returns {Promise<Object>} An object containing visit count and analytics data, or an error message.
 */
export declare const getUrlAnalytics: (shortHash: string) => Promise<{
    error: string;
    visitCount?: undefined;
    analytics?: undefined;
} | {
    visitCount: number;
    analytics: UrlAnalytics[];
    error?: undefined;
}>;
/**
 * Service to get all URLs for a specific user.
 * @param {string} userId - The ID of the user to fetch URLs for.
 * @returns {Promise<Object[]>} A list of URLs associated with the user, or an error message.
 */
export declare const getUserUrls: (userId: string) => Promise<Url[] | {
    error: string;
}>;
/**
 * Service to delete a URL for a specific user by shortHash.
 * @param {string} hash - The short hash of the URL to delete.
 * @returns {Promise<Object>} A success or error message based on the outcome of the deletion.
 */
export declare const deleteUrl: (hash: string) => Promise<{
    error: string;
    success?: undefined;
} | {
    success: string;
    error?: undefined;
}>;
