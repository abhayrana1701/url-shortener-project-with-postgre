import AppDataSource from "../config/data-source";  // Import the global data source
import { Url } from "../entity/url";
import { UrlAnalytics } from "../entity/urlanalytics";
import crypto from "crypto";
import useragent from "useragent";
import axios from "axios";

/**
 * Utility function to generate a unique hash for the URL.
 * @param {number} length - The length of the hash to generate (default is 6).
 * @returns {string} The generated hash.
 */
const generateShortHash = (length: number = 6): string => {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
};

/**
 * Service to create a shortened URL.
 * @param {string} originalUrl - The original URL to shorten.
 * @param {Date | null} expirationDate - The expiration date for the shortened URL, if any.
 * @param {string} userId - The ID of the user creating the shortened URL.
 * @returns {Promise<Object>} The created shortened URL object.
 */
export const createShortUrl = async (
  originalUrl: string,
  expirationDate: Date | null,
  userId: string
) => {
  const shortHash = generateShortHash();

  // Get the Url repository from the globally initialized data source
  const urlRepository = AppDataSource.getRepository(Url);
  const newUrl = urlRepository.create({
    originalUrl,
    shortHash,
    expirationDate,
    userId,
  });

  await urlRepository.save(newUrl);
  return newUrl;
};

/**
 * Service to find the original URL based on the short hash.
 * @param {string} shortHash - The shortened hash to lookup.
 * @returns {Promise<Object | null>} The original URL object or null if not found.
 */
export const findOriginalUrl = async (shortHash: string) => {
  // Get the Url repository from the globally initialized data source
  const urlRepository = AppDataSource.getRepository(Url);
  const url = await urlRepository.findOne({ where: { shortHash } });
  return url || null;
};

/**
 * Function to track the analytics for a URL visit.
 * @param {string} urlId - The ID of the URL being visited.
 * @param {string} ipAddress - The IP address of the visitor.
 * @param {string} userAgentString - The User-Agent string of the visitor.
 * @returns {Promise<void>} A promise that resolves when the tracking is complete.
 */
export const trackAnalytics = async (urlId: string, ipAddress: string, userAgentString: string) => {
  try {
    // Get the Url repository from the globally initialized data source
    const urlRepository = AppDataSource.getRepository(Url);

    // Find the URL by ID
    const url = await urlRepository.findOne({ where: { id: urlId } });

    if (url) {
      // Increment the visit count
      url.visitCount += 1;
      await urlRepository.save(url); // Save the updated URL
    }

    const agent = useragent.parse(userAgentString);
    const browser = agent.toAgent();
    const device = agent.device.toString();

    const location = await getLocationFromIP(ipAddress);

    // Get the UrlAnalytics repository from the globally initialized data source
    const analyticsRepository = AppDataSource.getRepository(UrlAnalytics);
    const analytics = analyticsRepository.create({
      urlId,
      browser,
      device,
      location,
    });

    await analyticsRepository.save(analytics);
  } catch (err) {
    console.error("Error tracking analytics:", err);
  }
};

/**
 * Helper function to get location from the IP address.
 * @param {string} ipAddress - The IP address of the visitor.
 * @returns {Promise<string>} The location of the visitor as a string (city, region, etc.).
 */
const getLocationFromIP = async (ipAddress: string): Promise<string> => {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);
    return response.data && response.data.city ? response.data.city : "Unknown Location";
  } catch (err) {
    console.error("Error getting location:", err);
    return "Unknown Location";
  }
};

/**
 * Service to get the analytics data for a URL.
 * @param {string} shortHash - The short hash of the URL to fetch analytics for.
 * @returns {Promise<Object>} An object containing visit count and analytics data, or an error message.
 */
export const getUrlAnalytics = async (shortHash: string) => {
  try {
    // Get the Url repository from the globally initialized data source
    const urlRepository = AppDataSource.getRepository(Url);
    const url = await urlRepository.findOne({ where: { shortHash } });

    if (!url) {
      return { error: "URL not found" };
    }

    // Get the UrlAnalytics repository from the globally initialized data source
    const analyticsRepository = AppDataSource.getRepository(UrlAnalytics);
    const analyticsData = await analyticsRepository.find({ where: { urlId: url.id } });

    if (analyticsData.length === 0) {
      return { error: "No analytics data available for this URL" };
    }

    return {
      visitCount: url.visitCount,
      analytics: analyticsData,
    };
  } catch (err) {
    console.error("Error retrieving analytics data:", err);
    return { error: "Error retrieving analytics data" };
  }
};

/**
 * Service to get all URLs for a specific user.
 * @param {string} userId - The ID of the user to fetch URLs for.
 * @returns {Promise<Object[]>} A list of URLs associated with the user, or an error message.
 */
export const getUserUrls = async (userId: string) => {
  try {
    // Get the Url repository from the globally initialized data source
    const urlRepository = AppDataSource.getRepository(Url);
    const userUrls = await urlRepository.find({ where: { userId } });

    if (userUrls.length === 0) {
      return { error: "No URLs found for this user" };
    }

    return userUrls;
  } catch (err) {
    console.error("Error retrieving URLs for the user:", err);
    return { error: "Error retrieving user URLs" };
  }
};

/**
 * Service to delete a URL for a specific user by shortHash.
 * @param {string} hash - The short hash of the URL to delete.
 * @returns {Promise<Object>} A success or error message based on the outcome of the deletion.
 */
export const deleteUrl = async (hash: string) => {
  try {
    // Get the Url repository from the globally initialized data source
    const urlRepository = AppDataSource.getRepository(Url);
    
    // Find the URL by its shortHash
    const url = await urlRepository.findOne({ where: { shortHash: hash } });

    if (!url) {
      return { error: "URL not found or you do not have permission to delete it" };
    }

    // Remove the found URL
    await urlRepository.remove(url);

    return { success: "URL deleted successfully" };
  } catch (err) {
    console.error("Error deleting URL:", err);
    return { error: "Error deleting URL" };
  }
};
