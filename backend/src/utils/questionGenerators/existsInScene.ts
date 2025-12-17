import { IGeneratedItem } from "../itemGenerator";

export function generateExistsInSceneQuestion(
    sceneItems: IGeneratedItem[],
    itemName: string,
    templateText: string
) {
    const exists = sceneItems.some(i => i.name === itemName);
    return {
        questionText: templateText.replace("{name}", itemName),
        options: [
            { text: "Yes", isCorrect: exists },
            { text: "No", isCorrect: !exists }
        ]
    }
}