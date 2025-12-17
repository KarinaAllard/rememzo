import express, { Request, Response } from "express";
import { hashPassword, verifyPassword, generateToken, generateRefreshToken, createAuthResponse } from "../../services/authService";
import { createUser, findUserByEmail } from "../../services/userService";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Email and password required" });

        const existingUser = await findUserByEmail(email);
        if (existingUser) return res.status(409).json({ error: "Email already registered" });

        const passwordHash = await hashPassword(password);
        const user = await createUser(email, passwordHash);

        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(201).json(createAuthResponse(user));
    } catch(error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/login", async (req: Request, res: Response ) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Email and password required" });

        const user = await findUserByEmail(email);
        if (!user || !(await verifyPassword(password, user.passwordHash))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.json(createAuthResponse(user));
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;