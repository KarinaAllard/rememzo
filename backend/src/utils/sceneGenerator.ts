import { ISceneTemplate } from "../models/SceneTemplates";

export interface ISlotWithChosenType {
    index: number;
    x: number;
    y: number;
    allowedTypes: string[];
    chosenType?: string;
}

export function assignRandomTypes(slots: ISlotWithChosenType[], chanceToFill = 0.7): ISlotWithChosenType[] {
    return slots.map(slot => {
        if (slot.allowedTypes.length === 0) {
            throw new Error(`Slot ${slot.index} has no allowed types`);
        }

        const fill = Math.random() < chanceToFill;
        if (!fill) return { ...slot };
        const randomIndex = Math.floor(Math.random() * slot.allowedTypes.length);
        return {
            ...slot,
            chosenType: slot.allowedTypes[randomIndex]
        };
    });
}

export function generateScene(template: ISceneTemplate) {
    const slotWithTypes = assignRandomTypes(template.slots);

    return slotWithTypes.map(slot => ({
        index: slot.index,
        x: slot.x,
        y: slot.y,
        chosenType: slot.chosenType
    }));
}