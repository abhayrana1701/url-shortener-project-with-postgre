"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlAnalyticsValidator = exports.deleteShortUrlValidator = exports.createShortUrlValidator = void 0;
const express_validator_1 = require("express-validator");
/**
 * Validator for creating a shortened URL.
 */
exports.createShortUrlValidator = [
    (0, express_validator_1.body)('originalUrl')
        .notEmpty().withMessage('originalUrl is required')
        .isURL().withMessage('originalUrl must be a valid URL'),
    (0, express_validator_1.body)('expirationDate')
        .optional()
        .isISO8601().withMessage('expirationDate must be a valid date in ISO 8601 format'),
    (0, express_validator_1.body)('userId')
        .notEmpty().withMessage('userId is required')
        .isString().withMessage('userId must be a string'), // Removed isMongoId validation
];
/**
 * Validator for deleting a shortened URL.
 * We validate the shortHash parameter here.
 */
exports.deleteShortUrlValidator = [
    (0, express_validator_1.param)('shortHash')
        .notEmpty().withMessage('shortHash is required')
        .isString().withMessage('shortHash must be a string'),
];
/**
 * Validator for retrieving analytics of a shortened URL.
 * We validate the shortHash parameter here.
 */
exports.getUrlAnalyticsValidator = [
    (0, express_validator_1.param)('shortHash')
        .notEmpty().withMessage('shortHash is required')
        .isString().withMessage('shortHash must be a string'),
];
//# sourceMappingURL=url.validation.js.map