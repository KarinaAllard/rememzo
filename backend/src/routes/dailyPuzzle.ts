import express, { Request, Response } from "express";
import { isValidPuzzleDate } from "../utils/validateDate";
import { DailySceneService } from "../services/dailySceneService";

const router = express.Router();

router.get("/daily", async (req: Request, res: Response) => {
    try {
        const date = req.query.date as string;

        if (!isValidPuzzleDate(date)) {
            return res.status(400).json({ error: "Invalid or missing date (expected YYYY-MM-DD)" });
        }

        const dailyScene = await DailySceneService.getOrGenerateScene(date);
        res.json(dailyScene);

    } catch(error: any) {
        console.error("Error in /daily route:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }

});

export default router;