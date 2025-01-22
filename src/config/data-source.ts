
import { User } from '../entity/user';
import { Url } from '../entity/url';
import { UrlAnalytics } from '../entity/urlanalytics';
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST || 'localhost', // Host (default: localhost)
  port: parseInt(process.env.DB_PORT || '5432'), // Port (default: 5432)
  username: process.env.DB_USERNAME || 'abhay', // Username
  password: process.env.DB_PASSWORD || '12345678', // Password
  database: process.env.DB_NAME || 'mydb', // Database name
  entities: [User, Url, UrlAnalytics],
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

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;