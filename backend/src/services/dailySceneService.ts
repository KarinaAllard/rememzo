import mongoose from "mongoose";
import DailyScene from "../models/DailyScenes";
import ItemsLibrary from "../models/ItemsLibrary";
import { IGeneratedScene, generateDailyScene } from "../utils/generateDailyScene";
import { generateQuestion, IGeneratedQuestion } from "./questionGenerator";
import SceneTemplates from "../models/SceneTemplates";

export class DailySceneService {
    static async getOrGenerateScene(date: string): Promise<any> {

        let dailyScene = await DailyScene.findOne({ date }).lean();
        if (dailyScene) {
            const template = await SceneTemplates.findById(dailyScene.templateId).lean();    
            return {...dailyScene, template};
        }

        const generatedScene: IGeneratedScene = await generateDailyScene();

        const allItems = await ItemsLibrary.find().lean();
        const itemsById = new Map(allItems.map(item => [item._id.toString(), item]));

        const allQuestions = await (await import("../models/QuestionsLibrary")).default.find().lean();
        if (!allQuestions.length) throw new Error("No questions available");

        const generatedQuestion: IGeneratedQuestion = await generateQuestion(
            generatedScene,
            itemsById,
            allQuestions
        );

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
                questionText: generatedQuestion.questionText,
                options: generatedQuestion.options
            },
            questionId: new mongoose.Types.ObjectId(generatedQuestion.questionId),
            timestamp: new Date(),
            date
        });

        const template = await SceneTemplates.findById(generatedScene.templateId).lean();

        return {
            ...dailyScene.toObject(),
            template
        }
    }
}
