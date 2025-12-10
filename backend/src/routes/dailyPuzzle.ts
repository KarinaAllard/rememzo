import express, { Router, Request, Response } from "express";
import mongoose from "mongoose";
import DailyScene from "../models/DailyScenes";
import { generateDailyScene, IGeneratedScene } from "../utils/generateDailyScene";
import { isValidPuzzleDate } from "../utils/validateDate";
import QuestionsLibrary from "../models/QuestionsLibrary";
import ItemsLibrary from "../models/ItemsLibrary";

const router = express.Router();

router.get("/daily", async (req: Request, res: Response) => {
    try {
        const date = req.query.date as string;

    if (!isValidPuzzleDate(date)) {
        return res.status(400).json({ error: "Invalid or missing date (expected YYYY-MM-DD)" });
    }

    let dailyScene = await DailyScene.findOne({ date }).lean();
    if (dailyScene) return res.json(dailyScene);

    const generatedScene: IGeneratedScene = await generateDailyScene();

    const allQuestions = await QuestionsLibrary.find();
    if (!allQuestions.length) throw new Error("No questions available");
    const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];

    const emptyItem = await ItemsLibrary.findOne({ type: "empty" });
    if (!emptyItem) throw new Error("Empty item not found");

    const itemsForDb = generatedScene.items.map(item => ({
        itemId: item.itemId === "empty"
            ? emptyItem._id
            : new mongoose.Types.ObjectId(item.itemId),
        variation: item.variation,
        state: item.state,
        slotIndex: item.slotIndex,
        x: item.x,
        y: item.y
    }));

    dailyScene = await DailyScene.create({
      templateId: new mongoose.Types.ObjectId(generatedScene.templateId),
      items: itemsForDb,
      question: {
        questionText: randomQuestion.templateText,
        options: Array.from({ length: randomQuestion.optionsCount }, (_, i) => ({
          text: `Option ${i + 1}`,
          isCorrect: i === 0 // placeholder: first option correct
        }))
      },
      questionId: new mongoose.Types.ObjectId(randomQuestion._id),
      timestamp: new Date(),
      date
    });

    res.json(dailyScene);

    } catch(error: any) {
        console.error("Error in /daily route:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }

});

export default router;