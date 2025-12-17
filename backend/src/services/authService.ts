import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const JWT_EXPIRES_IN = "15m";
const REFRESH_EXPIRES_IN = "7d";

export async function hashPassword(password: string) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}

export function generateToken(user: IUser) {
    return jwt.sign({ userId: user._id, email: user.email, }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function generateRefreshToken(user: IUser) {
    return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}