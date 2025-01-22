import { User } from "./user";
import { UrlAnalytics } from "./urlanalytics";
export declare class Url {
    id: string;
    originalUrl: string;
    shortHash: string;
    expirationDate: Date | null;
    createdAt: Date;
    visitCount: number;
    userId: string;
    user: User;
    analytics: UrlAnalytics[];
}
