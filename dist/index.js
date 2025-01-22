"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes")); // Import the central router
const swagger_1 = require("./swagger");
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata"); // Needed by TypeORM
const data_source_1 = __importDefault(require("./config/data-source")); // Your data-source setup
// Load environment variables from .env file
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
// CORS setup
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Allow only this origin for security
}));
// Load port and base URL from .env, with fallback defaults
const port = process.env.PORT || 3000; // Default to 3000 if not defined in .env
const baseUrl = process.env.BASE_URL || '/api'; // Default to '/api' if not defined
// Middleware setup
app.use(express_1.default.json()); // Body parsing middleware
// Function to start the server after initializing TypeORM
const startServer = async () => {
    try {
        // Initialize the TypeORM connection
        await data_source_1.default.initialize()
            .then(() => {
            console.log("Data Source has been initialized!");
        })
            .catch((err) => {
            console.error("Error during Data Source initialization:", err);
        });
        console.log('Database connected successfully');
        // Swagger setup (if needed)
        (0, swagger_1.setupSwagger)(app);
        // Use the central router for all API routes
        app.use(baseUrl, routes_1.default); // Use dynamic base URL for routes
        // Start the Express server after the DB connection is established
        app.listen(5000, () => {
            console.log(`Server is running at http://localhost:5000`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
    }
};
// Call the startServer function
startServer();
//# sourceMappingURL=index.js.map