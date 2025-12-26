import mongoose, { Document, Schema } from "mongoose";

export interface IGameAttempt extends Document {
    userId?: mongoose.Types.ObjectId;
    guestId?: string;
    sceneId: mongoose.Types.ObjectId;
    puzzleDate: string;
    remainingMs: number;
    startedAt: Date;
    completed: boolean;
}

const GameAttemptSchema = new Schema<IGameAttempt>({
    userId: { type: Schema.Types.ObjectId, ref: "users", required: false },
    guestId: { type: String, required: false },
    sceneId: { type: Schema.Types.ObjectId, ref: "dailyscenes", required: true },
    puzzleDate: { type: String, required: true },
    remainingMs: { type: Number, required: true },
    startedAt: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
}, { collection: "gameattempts "});

export default mongoose.model<IGameAttempt>("GameAttempt", GameAttemptSchema);