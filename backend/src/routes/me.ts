import express, { Response } from "express";
import { authenticateJWT, AuthRequest } from "../middleware/authenticateJWT";
import User from "../models/User";
import Stats from "../models/Stats";

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

            let stats = await Stats.findOne({ userId: user._id });
            if (!stats) {
                stats = await Stats.create({
                    userId: user._id,
                    totalGamesPlayed: 0,
                    totalWins: 0,
                    winrate: 0,
                    bestStreak: 0,
                    lastPlayed: undefined
                });
            }

            res.json({
                userId: user._id,
                email: user.email,
                streak: user.streak,
                preferences: user.preferences,
                stats: {
                    totalGamesPlayed: stats.totalGamesPlayed,
                    totalWins: stats.totalWins,
                    winrate: stats.winrate,
                    bestStreak: stats.bestStreak,
                    lastPlayed: stats.lastPlayed
                }
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
);

router.patch(
    "/me",
    authenticateJWT,
    async (req: AuthRequest, res: Response) => {
        try {
        if (!req.user?.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { language } = req.body;
        if (!language || !["en", "sv"].includes(language)) {
            return res.status(400).json({ error: "Invalid language" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            { "preferences.language": language },
            { new: true, runValidators: true }
        ).select("email streak preferences");

        if (!updatedUser) return res.status(404).json({ error: "User not found" });

        res.json({
            userId: updatedUser._id,
            email: updatedUser.email,
            streak: updatedUser.streak,
            preferences: updatedUser.preferences
        });

        } catch (error: any) {
        res.status(500).json({ error: error.message });
        }
    }
);

export default router;