import { Request, Response } from "express";
/**
 * Signup controller to handle user registration.
 *
 * @async
 * @function signup
 * @param {Request} req - The request object containing the user details (email, password) in the body.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<Response>} - A response with a status code and message indicating the result of the signup process.
 */
export declare const signup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Login controller to handle user authentication and token generation.
 *
 * @async
 * @function login
 * @param {Request} req - The request object containing the user credentials (email, password) in the body.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<Response>} - A response containing an access token, refresh token, and a message indicating the result of the login process.
 */
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
