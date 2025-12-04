import mongoose, { Document, Schema } from "mongoose";

export interface ISceneTemplate extends Document {
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

const SceneTemplateSchema: Schema<ISceneTemplate> = new Schema({
    name: { type: String, required: true },
    backgroundRef: { type: String, required: true },
    maxItems: { type: Number, required: true },
    slots: [
        {
            index: { type: Number, required: true },
            x: { type: Number, required: true},
            y: { type: Number, required: true},
            allowedTypes: { type: [String], required: true }
        }
    ]
});

export default mongoose.model<ISceneTemplate>("scenetemplates", SceneTemplateSchema);