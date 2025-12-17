import { IGeneratedItem } from "../itemGenerator";
import { IItem } from "../../models/ItemsLibrary";

export function generateWhichStateQuestion(
    sceneItems: IGeneratedItem[],
    itemsById: Map<string, IItem>,
    templateText: string,
    optionsCount: number,
): { questionText: string, options: { text: string; isCorrect: boolean }[] } {

    const candidates = sceneItems
    .filter(i => i.state !== "empty")
    .filter(i => (itemsById.get(i.itemId)?.states || []).length > 1);
    
    if (!candidates.length) {
        throw new Error("No valid items for whichState question");
    }

    const selectedItem = candidates[Math.floor(Math.random() * candidates.length)];
    const itemsFromLibrary = itemsById.get(selectedItem.itemId);
    const states = itemsFromLibrary?.states || ["default"];

    const shuffledStates = [...states].sort(() => 0.5 - Math.random());
    const chosenOptions = shuffledStates.slice(0, Math.max(optionsCount, 1));

    const options = chosenOptions.map(s => ({
        text: s,
        isCorrect: s === selectedItem.state
    }));

    const questionText = templateText.replace("{type}", selectedItem.name);

    return { questionText, options };
}