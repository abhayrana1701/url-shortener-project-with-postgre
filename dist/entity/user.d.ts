import { Url } from "./url";
export declare class User {
    id: string;
    email: string;
    password: string;
    refreshToken: string;
    urls: Url[];
    hashPassword(): Promise<void>;
    comparePassword(password: string): Promise<boolean>;
}
