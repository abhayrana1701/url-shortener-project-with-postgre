import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes';  // Import the central router
import { Request } from 'express';
import { setupSwagger } from './swagger';
import cors from 'cors'; 
import "reflect-metadata";  // Needed by TypeORM
import AppDataSource from './config/data-source';  // Your data-source setup

// Define the User interface according to your authentication system
interface User {
  id: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User
    userId?: string; // Or number, or whatever type your userId is
  }
}

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// CORS setup
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only this origin for security
}));

// Load port and base URL from .env, with fallback defaults
const port = process.env.PORT || 3000;  // Default to 3000 if not defined in .env
const baseUrl = process.env.BASE_URL || '/api';  // Default to '/api' if not defined

// Middleware setup
app.use(express.json());  // Body parsing middleware

// Function to start the server after initializing TypeORM
const startServer = async () => {
  try {
    // Initialize the TypeORM connection
    await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });
    
    console.log('Database connected successfully');

    // Swagger setup (if needed)
    setupSwagger(app);

    // Use the central router for all API routes
    app.use(baseUrl, apiRoutes);  // Use dynamic base URL for routes

    // Start the Express server after the DB connection is established
    app.listen(5000, () => {
      console.log(`Server is running at http://localhost:5000`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

// Call the startServer function
startServer();
