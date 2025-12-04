import mongoose, { Document, Schema } from "mongoose";

export interface IQuestion extends Document {
    type: string;
    requiredItemTypes: string[];
    templateText: string;
    optionsCount: number;
    translations?: Record<string, string>;
}

const QuestionSchema: Schema<IQuestion> = new Schema({
    type: { type: String, required: true },
    requiredItemTypes: { type: [String], required: true },
    templateText: { type: String, required: true },
    optionsCount: { type: Number, required: true },
    translations: { type: Map, of: String},
},
{ collection: "questionslibrary" }
);

export default mongoose.model<IQuestion>("QuestionsLibrary", QuestionSchema);