import User from "../models/User";
import { Types } from "mongoose";

export async function createUser(email: string, passwordHash: string) {
    return await User.create({ email, passwordHash });
}

export async function findUserByEmail(email: string) {
    return await User.findOne({ email });
}

export async function findUserById(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    return await User.findById(id); 
}