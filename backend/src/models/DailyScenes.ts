import mongoose, { Document, Schema } from "mongoose";

export interface IDailyScene extends Document {
    templateId: mongoose.Types.ObjectId;
    items: {
        itemId: mongoose.Types.ObjectId;
        variation: string;
        state: string;
        slotIndex: number;
        x: number;
        y: number;
    }[];
    question: {
        questionText: string;
        options: { 
            text: string; 
            isCorrect: boolean 
        }[];
    }
    questionId: mongoose.Types.ObjectId;
    timestamp: Date;
}

const DailySceneSchema: Schema<IDailyScene> = new Schema({
    templateId: { type: Schema.Types.ObjectId, ref: "scenetemplates", required: true },
    items: [
        {
            itemId: { type: Schema.Types.ObjectId, ref: "itemslibrary", required: true },
            variation: { type: String, requred: true },
            state: { type: String, required: true },
            slotIndex: { type: Number, required: true },
            x: { type: Number, required: true },
            y: { type: Number, required: true }
        }
    ],
    question: {
        questionText: { type: String, required: true },
        options: [
            {
                text: { type: String, required: true },
                isCorrect: { type: Boolean, required: true }
            }
        ]
    },
    questionId: { type: Schema.Types.ObjectId, ref: "questionslibrary", required: true },
    timestamp: { type: Date, default: Date.now }
},
{ collection: "dailyscenes" }
);

export default mongoose.model<IDailyScene>("DailyScene", DailySceneSchema);