import express, { Request, Response } from "express";
import User from "../../models/User";
import { hashPassword, verifyPassword, generateToken, generateRefreshToken } from "../../services/authService";
import { createUser, findUserByEmail } from "../../services/userService";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ error: "Email and password required" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ error: "Email already registered" });

        const passwordHash = await hashPassword(password);
        const user = await createUser(email, passwordHash);

        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(201).json({ token, refreshToken, userId: user._id });
    } catch(error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/login", async (req: Request, res: Response ) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Email and password required" });

        const user = await findUserByEmail(email);
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const valid = await verifyPassword(password, user.passwordHash);
        if (!valid) return res.status(401).json({ error: "Invalid credentials" });

        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({ token, refreshToken, userId: user._id });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;