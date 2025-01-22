import "reflect-metadata";
interface User {
    id: string;
}
declare module 'express-serve-static-core' {
    interface Request {
        user?: User;
        userId?: string;
    }
}
export {};
