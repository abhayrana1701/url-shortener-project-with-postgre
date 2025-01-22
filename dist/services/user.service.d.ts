/**
 * Service to register a new user.
 * @param {string} email - The email of the user being registered.
 * @param {string} password - The password of the user being registered.
 * @returns {Promise<Object>} An object containing either a success message or an error message.
 */
export declare const signupUser: (email: string, password: string) => Promise<{
    error: string;
    message?: undefined;
} | {
    message: string;
    error?: undefined;
}>;
/**
 * Service to log in a user.
 * @param {string} email - The email of the user attempting to log in.
 * @param {string} password - The password provided by the user during login.
 * @returns {Promise<Object>} An object containing either a success message, access token, refresh token, or an error message.
 */
export declare const loginUser: (email: string, password: string) => Promise<{
    error: string;
    message?: undefined;
    accessToken?: undefined;
    refreshToken?: undefined;
} | {
    message: string;
    accessToken: string;
    refreshToken: string;
    error?: undefined;
}>;
/**
 * Service to refresh the access token using the refresh token.
 * @param {string} refreshToken - The refresh token to use for generating a new access token.
 * @returns {Promise<Object>} An object containing either a new access token or an error message.
 */
export declare const refreshAccessToken: (refreshToken: string) => Promise<{
    error: string;
    newAccessToken?: undefined;
} | {
    newAccessToken: string;
    error?: undefined;
}>;
