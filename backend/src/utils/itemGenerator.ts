import { ISlotWithChosenType } from "./sceneGenerator";
import ItemsLibrary, { IItem } from "../models/ItemsLibrary";

export interface IGeneratedItem {
    itemId: string;
    name: string;
    type: string;
    variation: string;
    state: string;
    slotIndex: number;
    x: number;
    y: number;
}

export async function generateItemsForSlots(slots: ISlotWithChosenType[]): Promise<IGeneratedItem[]> {
    const allItems: IItem[] = await ItemsLibrary.find();

    const generatedItems: IGeneratedItem[] = [];

    slots.forEach(slot => {
        if (!slot.chosenType) {
            generatedItems.push({
                itemId: "empty",
                name: "empty",
                type: "empty",
                variation: "empty",
                state: "empty",
                slotIndex: slot.index,
                x: slot.x,
                y: slot.y
            });
            return;
        }

        const candidates = allItems.filter(item => item.type === slot.chosenType);
        if (candidates.length === 0) {
            generatedItems.push({
                itemId: "empty",
                name: "empty",
                type: "empty",
                variation: "empty",
                state: "empty",
                slotIndex: slot.index,
                x: slot.x,
                y: slot.y
            });
            return;
        }

        const chosenItem = candidates[Math.floor(Math.random() * candidates.length)];

        const randIndex = Math.floor(Math.random() * Math.max(chosenItem.states.length, 1));
        const variation = chosenItem.variations[randIndex] || "default";
        const state = chosenItem.states[randIndex] || "default";

        generatedItems.push({
            itemId: chosenItem._id.toString(),
            name: chosenItem.name,
            type: chosenItem.type,
            variation,
            state,
            slotIndex: slot.index,
            x: slot.x,
            y: slot.y
        });
    });

    return generatedItems;
}