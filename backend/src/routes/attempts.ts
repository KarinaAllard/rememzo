import express, { Response } from "express";
import GameAttempts from "../models/GameAttempts";
import Attempts from "../models/Attempts";
import { authenticateJWT, AuthRequest } from "../middleware/authenticateJWT";
import mongoose from "mongoose";
import User from "../models/User";
import Stats from "../models/Stats";

const router = express.Router();

router.post("/:attemptId/answer", authenticateJWT,  async (req: AuthRequest, res: Response) => {
    try {
        const { attemptId } = req.params;
        const { questionId, selectedOption, correct } = req.body;

        const gameAttempt = await GameAttempts.findById(attemptId);
        if (!gameAttempt) return res.status(404).json({ error: "Attempt not found" });

        if (gameAttempt.completed) {
            return res.status(400).json({ error: "This attempt is already completed" });
        }

        if (!req.user?.userId) {
            return res.status(401).json({ error: "User must be logged in to save result" });
        }

        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const attemptRecord = await Attempts.create({
            userId,
            sceneId: gameAttempt.sceneId,
            won: correct,
            answer: { questionId, selectedOption, correct },
        });

        gameAttempt.completed = true;
        await gameAttempt.save();

        const user = await User.findById(userId);
        if (!user) return res.status(404).json ({ error: "User not found" });

        let stats = await Stats.findOne({ userId });
        if (!stats) {
            stats = await Stats.create({
                userId,
                totalGamesPlayed: 0,
                totalWins: 0,
                winrate: 0,
                bestStreak: 0,
                lastPlayed: new Date(),
            });
        }

        stats.totalGamesPlayed += 1;
        stats.lastPlayed = new Date();

        if (attemptRecord.won) {
            user.streak += 1;
            stats.totalWins +=1;

            if (user.streak > stats.bestStreak) stats.bestStreak = user.streak;
        } else {
            user.streak = 0;
        }

        stats.winrate = stats.totalWins / stats.totalGamesPlayed;

        await user.save();
        await stats.save();

        res.json(attemptRecord);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/:attemptId", authenticateJWT, async (req: AuthRequest, res: Response) => {
    try {
        const { attemptId } = req.params;

        const gameAttempt = await GameAttempts.findById(attemptId);
        if (!gameAttempt) return res.status(404).json({ error: "Game attempt not found" });

        const attemptRecord = await Attempts.findOne({
            userId: req.user?.userId,
            sceneId: gameAttempt.sceneId,
        });

        if (!attemptRecord) return res.status(404).json({ error: "Result not found for this attempt" });

        res.json(attemptRecord);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/user/:userId", authenticateJWT, async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req.params;

        if (req.user?.userId !== userId) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const attempts = await Attempts.find({ userId: new mongoose.Types.ObjectId(userId) })
            .sort({ timestamp: -1 });

            res.json(attempts);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/last/:userId", authenticateJWT, async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req.params;

        if (req.user?.userId !== userId) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const lastAttempt = await Attempts.findOne({ userId: new mongoose.Types.ObjectId(userId) })
            .sort({ timestamp: -1 });

        if (!lastAttempt) return res.status(404).json({ error: "No attempt found" });

        res.json(lastAttempt);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/user/:userId/range", authenticateJWT, async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req.params;
        const { from, to } = req.query;

        if (req.user?.userId !== userId) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const query: any = { userId: new mongoose.Types.ObjectId(userId) };
        if (from || to) {
            query.timestamp = {};
            if (from) query.timestamp.$gte = new Date(from as string);
            if (to) query.timestamp.$lte = new Date(to as string);
        }

        const attempts = await Attempts.find(query).sort({ timestamp: -1 });
        res.json(attempts);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
