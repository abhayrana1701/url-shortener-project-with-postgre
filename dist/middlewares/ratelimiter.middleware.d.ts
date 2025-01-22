/**
 * Rate limiter middleware to limit repeated requests to public APIs.
 *
 * @returns {rateLimit} - A configured rate limiter middleware for Express.
 */
declare const createRateLimiter: () => import("express-rate-limit").RateLimitRequestHandler;
export default createRateLimiter;
