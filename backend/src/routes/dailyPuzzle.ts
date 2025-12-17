import express, { Router, Request, Response } from "express";
import mongoose from "mongoose";
import DailyScene from "../models/DailyScenes";
import { generateDailyScene, IGeneratedScene } from "../utils/generateDailyScene";
import { isValidPuzzleDate } from "../utils/validateDate";
import QuestionsLibrary from "../models/QuestionsLibrary";
import ItemsLibrary, { IItem } from "../models/ItemsLibrary";
import { generateCountOptions } from "../utils/questionGenerators/countItemType";
import { generateWhichStateQuestion } from "../utils/questionGenerators/whichState";
import { generateExistsInSceneQuestion } from "../utils/questionGenerators/existsInScene";

const router = express.Router();

router.get("/daily", async (req: Request, res: Response) => {
    try {
        const date = req.query.date as string;

    if (!isValidPuzzleDate(date)) {
        return res.status(400).json({ error: "Invalid or missing date (expected YYYY-MM-DD)" });
    }

    const allItems = await ItemsLibrary.find().lean();

    const itemsById = new Map(
      allItems.map(item => [item._id.toString(), item])
    );

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

    let questionText = randomQuestion.templateText;
    let options: { text: string; isCorrect: boolean }[] = [];

    try {
      switch (randomQuestion.type) {
      case "countItemType": {
        const sceneItems = generatedScene.items.filter(i => i.state !== "empty");

        const availableTypesInScene = Array.from(new Set(sceneItems.map(i => i.name)));

        const selectedType = availableTypesInScene.length
        ? availableTypesInScene[Math.floor(Math.random() * availableTypesInScene.length)]
        : randomQuestion.requiredItemTypes[0];

        const count = sceneItems.filter(i => i.name === selectedType).length;

        options = generateCountOptions(count, randomQuestion.optionsCount);

        questionText = randomQuestion.templateText.replace("{type}", selectedType);

        break;
      }

      case "whichState": {
        const sceneItems = generatedScene.items.filter(i => i.state !== "empty");
        ({ questionText, options } = generateWhichStateQuestion(
            sceneItems,
            itemsById,
            randomQuestion.templateText,
            randomQuestion.optionsCount
        ));

        break;
    }

      case "existsInScene": {
        const sceneItems = generatedScene.items.filter(i => i.state !== "empty");
        const libraryItems = Array.from(itemsById.values());

        const shouldExist = Math.random() < 0.5;

        let selectedLibraryItem: IItem | undefined;

        if (shouldExist && sceneItems.length) {
          const itemInScene = sceneItems[Math.floor(Math.random() * sceneItems.length)];
          selectedLibraryItem = libraryItems.find(libItem => libItem.name === itemInScene.name);
        } else {
          const sceneNames = new Set(sceneItems.map(i => i.name));
          const itemsNotInScene = libraryItems.filter(i => !sceneNames.has(i.name));

          if (!itemsNotInScene.length) {
            selectedLibraryItem = libraryItems[Math.floor(Math.random() * libraryItems.length)];
          } else {
            selectedLibraryItem = itemsNotInScene[Math.floor(Math.random() * itemsNotInScene.length)];
          }
        }

        if (!selectedLibraryItem) throw new Error("Failed to select item for existsInScene question");

        const selectedName = selectedLibraryItem.name;
        
        ({ questionText, options } = generateExistsInSceneQuestion(
          sceneItems,
          selectedName,
          randomQuestion.templateText
        ));

        break;
    }

      default:
        throw new Error(`Unsupported question type: ${randomQuestion.type}`);
    }
  } catch (error) {
    console.warn("Question generation failed, picking a new type", error);

    const alternativeQuestions = allQuestions.filter(q => q.type !== randomQuestion.type);
    const newQuestion = alternativeQuestions[Math.floor(Math.random() * alternativeQuestions.length)];
  }

    dailyScene = await DailyScene.create({
      templateId: new mongoose.Types.ObjectId(generatedScene.templateId),
      items: itemsForDb,
      question: {
        questionText,
        options
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