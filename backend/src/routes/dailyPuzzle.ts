import { Router } from "express";
import { isValidPuzzleDate } from "../utils/validateDate";
import DailyScenes from "../models/DailyScenes";

const router = Router();

router.get("/daily", async (req, res) => {
    const date = req.query.date as string;

    if (!isValidPuzzleDate(date)) {
        return res.status(400).json({ error: "Invalid or missing date (expected YYYY-MM-DD)" });
    }

    const existing = await DailyScenes.findOne({ date }).lean();

    if (existing) {
        return res.json({
            templateId: existing.templateId,
            items: existing.items,
            question: existing.question,
            questionId: existing.questionId,
            timestamp: existing.timestamp
        });
    }

    res.json({ message: "No puzzle exists yet for this date" });
});

export default router;