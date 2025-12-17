import User from "../models/User";

export async function createUser(email: string, passwordHash: string) {
    return await User.create({ email, passwordHash });
}

export async function findUserByEmail(email: string) {
    return await User.findOne({ email });
}