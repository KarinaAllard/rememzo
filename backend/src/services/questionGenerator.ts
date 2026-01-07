import { IGeneratedScene } from "../utils/generateDailyScene";
import { IItem } from "../models/ItemsLibrary";
import { generateCountOptions } from "../utils/questionGenerators/countItemType";
import { generateWhichStateQuestion } from "../utils/questionGenerators/whichState";
import { generateExistsInSceneQuestion } from "../utils/questionGenerators/existsInScene";
import { IQuestion } from "../models/QuestionsLibrary";

export interface IGeneratedQuestion {
    questionText: string;
    options: { text: string; isCorrect: boolean }[];
    questionId: string;
}

export async function generateQuestion(
    generatedScene: IGeneratedScene,
    itemsById: Map<string, IItem>,
    allQuestions: IQuestion[]
): Promise<IGeneratedQuestion> {
    const sceneItems = generatedScene.items.filter(i => i.state !== "empty");
    const libraryItems = Array.from(itemsById.values()).filter(i => i.type !== "empty");

    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
        attempts++;
        const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];

        try {
            switch (randomQuestion.type) {
                case "countItemType": {
                    const validItems = sceneItems.filter(item =>
                        randomQuestion.requiredItemTypes.includes(item.type)
                    );

                    if (!validItems.length) {
                        throw new Error("No valid items for countItemType question");
                    }

                    const availableTypes = Array.from(new Set(validItems.map(i => i.type)));

                    const selectedType =
                        availableTypes[Math.floor(Math.random() * availableTypes.length)];

                    const count = validItems.filter(i => i.type === selectedType).length;

                    const options = generateCountOptions(count, randomQuestion.optionsCount);
                    const questionText = randomQuestion.templateText.replace("{type}", selectedType);

                    return { questionText, options, questionId: randomQuestion._id.toString() };
                }

                case "whichState": {
                    const candidates = sceneItems.filter(i =>
                        randomQuestion.requiredItemTypes.includes(itemsById.get(i.itemId)?.type || "") &&
                        (itemsById.get(i.itemId)?.states.length || 0) > 1
                    );

                    if (!candidates.length) throw new Error("No valid items for whichState question");

                    const result = generateWhichStateQuestion(
                        sceneItems,
                        itemsById,
                        randomQuestion.templateText,
                        randomQuestion.optionsCount
                    );

                    return { ...result, questionId: randomQuestion._id.toString() };
                }

                case "existsInScene": {
                    const shouldExist = Math.random() < 0.5;

                    let selectedItem: IItem;

                    if (shouldExist && sceneItems.length) {
                        const itemInScene = sceneItems[Math.floor(Math.random() * sceneItems.length)];
                        selectedItem = libraryItems.find(libItem => libItem.name === itemInScene.name)!;
                    } else {
                        const sceneNames = new Set(sceneItems.map(i => i.name));
                        const notInScene = libraryItems.filter(lib => !sceneNames.has(lib.name));
                        selectedItem = notInScene.length
                            ? notInScene[Math.floor(Math.random() * notInScene.length)]
                            : libraryItems[Math.floor(Math.random() * libraryItems.length)];
                    }

                    return {
                        ...generateExistsInSceneQuestion(sceneItems, selectedItem.name, randomQuestion.templateText),
                        questionId: randomQuestion._id.toString()
                    };
                }

                default:
                    throw new Error(`Unsupported question type: ${randomQuestion.type}`);
            }
        } catch (error) {
            console.warn("Question generation failed, picking a new type", error);
        }
    }

    throw new Error("Failed to generate a valid question after 5 attempts");
}