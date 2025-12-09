import { Router } from "express";
import { isValidPuzzleDate } from "../utils/validateDate";

const router = Router();

router.get("/daily", async (req, res) => {
    const date = req.query.date as string;

    if (!isValidPuzzleDate(date)) {
        return res.status(400).json({ error: "Invalid or missing date (expected YYYY-MM-DD)" });
    }

    res.json({ message: "Date ok", date });
});

export default router;