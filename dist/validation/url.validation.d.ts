/**
 * Validator for creating a shortened URL.
 */
export declare const createShortUrlValidator: import("express-validator").ValidationChain[];
/**
 * Validator for deleting a shortened URL.
 * We validate the shortHash parameter here.
 */
export declare const deleteShortUrlValidator: import("express-validator").ValidationChain[];
/**
 * Validator for retrieving analytics of a shortened URL.
 * We validate the shortHash parameter here.
 */
export declare const getUrlAnalyticsValidator: import("express-validator").ValidationChain[];
