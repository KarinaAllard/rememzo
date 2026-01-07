import { IGeneratedItem } from "../itemGenerator";
import { IItem } from "../../models/ItemsLibrary";

export function generateWhichStateQuestion(
    sceneItems: IGeneratedItem[],
    itemsById: Map<string, IItem>,
    templateText: string,
    optionsCount: number,
    lang: string = "en"
): { questionText: string, options: { text: string; isCorrect: boolean }[] } {

    const candidates = sceneItems
    .filter(i => i.state !== "empty")
    .filter(i => (itemsById.get(i.itemId)?.states || []).length > 1);
    
    if (!candidates.length) {
        throw new Error("No valid items for whichState question");
    }

    const selectedItem = candidates[Math.floor(Math.random() * candidates.length)];
    const itemsFromLibrary = itemsById.get(selectedItem.itemId);
    if (!itemsFromLibrary) throw new Error("Item not found in library");

    const states = itemsFromLibrary?.states || ["default"];

    let questionText = "";
    let options: { text: string; isCorrect: boolean }[] = [];

    if (states.length === 2) {
        const correctState = selectedItem.state;
        const templateStr = (itemsFromLibrary.questionTemplate as Record<string, string>)?.[lang] 
            || templateText 
            || "Was the {name} {state}?";
        questionText = templateStr
            .replace("{name}", selectedItem.name)
            .replace("{state}", correctState);

        options = [
            { text: "Yes", isCorrect: true },
            { text: "No", isCorrect: false },
        ];

        options.sort(() => 0.5 - Math.random());
    } else {
        const templateStr = (itemsFromLibrary.questionTemplate as Record<string, string>)?.[lang] 
            || "What was the state of the {name}";
        questionText = templateStr.replace("{name}", selectedItem.name);

        const shuffledStates = [...states].sort(() => 0.5 - Math.random());
        const chosenOptions = shuffledStates.slice(0, Math.max(optionsCount, shuffledStates.length));

        options = chosenOptions.map(s => ({
            text: s,
            isCorrect: s === selectedItem.state
        }));

        if (!options.some(o => o.isCorrect)) {
            options[0] = { text: selectedItem.state, isCorrect: true };
        }

    }

    return { questionText, options };
}