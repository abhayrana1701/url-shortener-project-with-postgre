import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppDataSource from "../config/data-source";  // Import the global data source
import { User } from "../entity/user";

const JWT_SECRET = "r9j5$w2wQ2nd!Bk7d28ZdA8Gtf8$6%G98D85vpt2dF6d6vMy3K8p";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  try {
    // Decode the token to get the user ID
    const decoded: any = jwt.verify(token, JWT_SECRET);
    
    // Attach user ID to request object
    req.userId = decoded.userId;

    // Optionally, you can validate the user existence from the database if needed
    const userRepository = AppDataSource.getRepository(User);  // Assuming you have a User entity
    const user = await userRepository.findOne({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Proceed to the next middleware if user exists
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
