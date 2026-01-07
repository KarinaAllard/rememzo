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
        en: {
            questionText: string;
            options: { text: string; isCorrect: boolean }[];
        };
        sv: {
            questionText: string;
            options: { text: string; isCorrect: boolean }[];
        };
    }
    questionId: mongoose.Types.ObjectId;
    timestamp: Date;
    date: string;
}

const DailySceneSchema: Schema<IDailyScene> = new Schema({
    templateId: { type: Schema.Types.ObjectId, ref: "scenetemplates", required: true },
    items: [
        {
            itemId: { type: Schema.Types.ObjectId, ref: "itemslibrary", required: true },
            variation: { type: String, required: true },
            state: { type: String, required: true },
            slotIndex: { type: Number, required: true },
            x: { type: Number, required: true },
            y: { type: Number, required: true }
        }
    ],
    question: {
        en: {
            questionText: { type: String, required: true },
            options: [
                { text: { type: String, required: true }, isCorrect: { type: Boolean, required: true } }
            ]
        },
        sv: {
            questionText: { type: String, required: true },
            options: [
                { text: { type: String, required: true }, isCorrect: { type: Boolean, required: true } }
            ]
        }
    },
    questionId: { type: Schema.Types.ObjectId, ref: "questionslibrary", required: true },
    timestamp: { type: Date, default: Date.now },
    date: { type: String, required: true}
},
{ collection: "dailyscenes" }
);

export default mongoose.model<IDailyScene>("DailyScene", DailySceneSchema);