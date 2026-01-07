import express, { Request, Response } from "express";
import { isValidPuzzleDate } from "../utils/validateDate";
import { DailySceneService } from "../services/dailySceneService";
import { AuthRequest } from "../middleware/authenticateJWT";

const router = express.Router();

router.get("/daily", async (req: AuthRequest, res: Response) => {
    try {
        const date = req.query.date as string;
        const langQuery = req.query.lang as "en" | "sv" | undefined;

        const lang: "en" | "sv" = 
            langQuery ?? (req.user?.preferences?.language as "en" | "sv") ?? "en";

        if (!isValidPuzzleDate(date)) {
            return res.status(400).json({ error: "Invalid or missing date (expected YYYY-MM-DD)" });
        }

        const dailyScene = await DailySceneService.getOrGenerateScene(date, lang);
        res.json(dailyScene);

    } catch(error: any) {
        console.error("Error in /daily route:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }

});

export default router;