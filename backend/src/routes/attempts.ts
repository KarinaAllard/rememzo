import express, { Request, Response } from "express";
import GameAttempts from "../models/GameAttempts";
import Attempts from "../models/Attempts";

const router = express.Router();

router.post("/:attemptId/answer",  async (req: Request, res: Response) => {
    try {
        const { attemptId } = req.params;
        const { questionId, selectedOption, correct } = req.body;

        const gameAttempt = await GameAttempts.findById(attemptId);
        if (!gameAttempt) return res.status(404).json({ error: "Attempt not found" });

        if (gameAttempt.completed) {
            return res.status(400).json({ error: "This attempt is already completed" });
        }

        const attemptRecord = await Attempts.create({
            userId: gameAttempt.userId,
            sceneId: gameAttempt.sceneId,
            won: correct,
            answer: { questionId, selectedOption, correct },
        });

        res.json(attemptRecord);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });

    }
});

