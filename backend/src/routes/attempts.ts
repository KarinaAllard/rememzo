import express, { Response } from "express";
import GameAttempts from "../models/GameAttempts";
import Attempts from "../models/Attempts";
import { authenticateJWT, AuthRequest } from "../middleware/authenticateJWT";
import mongoose from "mongoose";

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

        const attemptRecord = await Attempts.create({
            userId: new mongoose.Types.ObjectId(req.user.userId),
            sceneId: gameAttempt.sceneId,
            won: correct,
            answer: { questionId, selectedOption, correct },
        });

        gameAttempt.completed = true;
        await gameAttempt.save();

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

export default router;
