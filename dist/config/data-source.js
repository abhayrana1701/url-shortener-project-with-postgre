"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../entity/user");
const url_1 = require("../entity/url");
const urlanalytics_1 = require("../entity/urlanalytics");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST || 'localhost', // Host (default: localhost)
    port: parseInt(process.env.DB_PORT || '5432'), // Port (default: 5432)
    username: process.env.DB_USERNAME || 'abhay', // Username
    password: process.env.DB_PASSWORD || '12345678', // Password
    database: process.env.DB_NAME || 'mydb', // Database name
    entities: [user_1.User, url_1.Url, urlanalytics_1.UrlAnalytics],
    migrations: ["dist/migrations/*.{js}"],
    synchronize: false,
    logging: process.env.NODE_ENV === "development",
    ssl: process.env.DB_SSL === "true" ? {
        rejectUnauthorized: false
    } : false,
    cache: {
        duration: 1000 * 60 * 60 // Cache for 1 hour
    }
};
const AppDataSource = new typeorm_1.DataSource(dataSourceOptions);
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map