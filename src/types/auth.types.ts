import { Request } from "express";

export type TokenPayload = {
    userId: number;
    email: string;
};

export interface AuthRequest extends Request {
    userId?: number;
}