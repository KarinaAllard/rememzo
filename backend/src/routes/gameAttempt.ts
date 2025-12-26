import express from "express";
import { GameAttemptService } from "../services/gameAttemptService";

const router = express.Router();

router.post("/start", async (req, res) => {
    try {
        const { userId, guestId, sceneId, puzzleDate } = req.body;

        const attempt = await GameAttemptService.getOrCreateAttempt({
            userId,
            guestId,
            sceneId,
            puzzleDate,
            totalTimeMs: 20000
        });

        res.json(attempt);
    } catch (error: any) {
        console.error("Error starting attempt:", error);
        res.status(500).json({ error: error.message });
    }
});

router.patch("/:id/update", async (req, res) => {
    try {
        const { remainingMs } = req.body;
        const updated = await GameAttemptService.updateRemainingMs(req.params.id, remainingMs);
        res.json(updated);
    } catch (error: any) {
        console.error("Error updating attempt:", error);
        res.status(500).json({ error: error.message });
    }
});

router.patch("/:id/complete", async (req, res) => {
    try {
        const updated = await GameAttemptService.completeAttempt(req.params.id);
        res.json(updated);
    } catch (error: any) {
        console.error("Error completing attempt:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;