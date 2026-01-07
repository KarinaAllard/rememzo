import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email?: string;
        preferences?: {
            language: "en" | "sv";
        }
    };
}

export function authenticateJWT(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Missing Authorization header" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Missing token" });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as AuthRequest["user"];
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}