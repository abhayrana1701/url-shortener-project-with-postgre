import { Request, Response } from "express";
/**
 * Controller to shorten a URL.
 * This endpoint creates a shortened version of the original URL and returns the shortened URL.
 * @param {Request} req - The request object containing the original URL and expiration date in the body.
 * @param {Response} res - The response object to send back the shortened URL or an error message.
 * @returns {Promise<void>} Sends a JSON response with the shortened URL or an error message.
 */
export declare const shortenUrl: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Controller to redirect to the original URL based on the shortened hash.
 * This endpoint redirects the user to the original URL or returns an error if the URL has expired or is invalid.
 * @param {Request} req - The request object containing the short hash in the parameters.
 * @param {Response} res - The response object to redirect to the original URL or return an error message.
 * @returns {Promise<void>} Sends a redirect response or an error message.
 */
export declare const redirectUrl: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
/**
 * Controller to get analytics data for a specific shortened URL.
 * This endpoint retrieves visit statistics for the specified shortened URL.
 * @param {Request} req - The request object containing the short hash in the parameters.
 * @param {Response} res - The response object to return the analytics data or an error message.
 * @returns {Promise<void>} Sends a JSON response with the analytics data or an error message.
 */
export declare const getUrlAnalyticsController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Controller to fetch all URLs for a specific user.
 * This endpoint retrieves all URLs associated with the authenticated user.
 * @param {Request} req - The request object containing the userId from the authenticated user (set after JWT authentication).
 * @param {Response} res - The response object to return the list of URLs or an error message.
 * @returns {Promise<void>} Sends a JSON response with the user's URLs or an error message.
 */
export declare const getUserUrlsController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Controller to delete a specific shortened URL.
 * This endpoint deletes the shortened URL based on the provided hash.
 * @param {Request} req - The request object containing the short hash of the URL to delete in the parameters.
 * @param {Response} res - The response object to return the deletion result or an error message.
 * @returns {Promise<void>} Sends a JSON response confirming deletion or an error message.
 */
export declare const deleteUrlController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
