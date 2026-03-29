
import { Request, Response, NextFunction } from "express";
import { TokenPayload, AuthRequest } from "../modules/auth/auth.types";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "token missing" });
    }
    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;

        req.userId = decoded.userId;


        next()


    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }


};

export default authMiddleware;