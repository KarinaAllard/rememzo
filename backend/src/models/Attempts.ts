import mongoose, { Document, Schema } from "mongoose";

export interface IAttempt extends Document {
    userId: mongoose.Types.ObjectId;
    sceneId: mongoose.Types.ObjectId;
    won: boolean;
    answer: {
        questionId: mongoose.Types.ObjectId;
        selectedOption: string;
        correct: boolean;
    };
    timestamp: Date;
}

const AttemptSchema: Schema<IAttempt> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    sceneId: { type: Schema.Types.ObjectId, ref: "dailyscenes", required: true },
    won: { type: Boolean, required: true },
    answer: { 
        questionId: { type: Schema. Types.ObjectId, ref: "questionslibrary", required: true },
        selectedOption: { type: String, required: true },
        correct: { type: Boolean, required: true }
        },
    timestamp: { type: Date, default: Date.now }
},
{ collection: "attempts" }
);

export default mongoose.model<IAttempt>("Attempt", AttemptSchema);