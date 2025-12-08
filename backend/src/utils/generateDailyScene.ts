import SceneTemplates from "../models/SceneTemplates";
import { generateScene, ISlotWithChosenType } from "./sceneGenerator";
import { generateItemsForSlots, IGeneratedItem } from "./itemGenerator";

export interface ISceneTemplateLean {
    _id: string;
    name: string; 
    backgroundRef: string;
    maxItems: number;
    slots: {
        index: number;
        x: number;
        y: number;
        allowedTypes: string[];
    }[];
}

export interface IGeneratedScene {
    templateId: string;
    templateName: string;
    slots: ISlotWithChosenType[];
    items: IGeneratedItem[];
}

export async function generateDailyScene(templateId?: string): Promise<IGeneratedScene> {
    let template: ISceneTemplateLean | null;

    if (templateId) {
        template = await SceneTemplates.findById(templateId).lean<ISceneTemplateLean>();
    } else {
        const templates = await SceneTemplates.find().lean<ISceneTemplateLean[]>();
        if (!templates.length) throw new Error("No scene templates found");
        const randomIndex = Math.floor(Math.random() * templates.length);
        template = templates[randomIndex];
    }

    if (!template) throw new Error("No template found");

    const slotsWithTypes: ISlotWithChosenType[] = generateScene(template);
    const items: IGeneratedItem[] = await generateItemsForSlots(slotsWithTypes);

    return {
        templateId: template._id,
        templateName: template.name,
        slots: slotsWithTypes,
        items
    }
}