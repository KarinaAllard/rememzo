import express, { Response } from "express";
import { authenticateJWT, AuthRequest } from "../middleware/authenticateJWT";
import User from "../models/User";

const router = express.Router();

router.get(
    "/me",
    authenticateJWT,
    async (req: AuthRequest, res: Response) => {
        try {
            if (!req.user?.userId) {
                return res.status(401).json({ error: "Unauthorized"});
            }

            const user = await User.findById(req.user.userId).select(
                "email streak preferences"
            );

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json({
                userId: user._id,
                email: user.email,
                streak: user.streak,
                preferences: user.preferences
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
);

export default router;