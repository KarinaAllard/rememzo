import mongoose, { Document, Schema } from "mongoose";

export interface IStats extends Document {
    userId: mongoose.Types.ObjectId;
    totalGamesPlayed: number;
    totalWins: number;
    winrate: number;
    bestStreak: number;
    lastPlayed: Date;
}

const StatsSchema: Schema<IStats> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    totalGamesPlayed: { type: Number, default: 0 },
    totalWins: { type: Number, default: 0 },
    winrate: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },
    lastPlayed: { type: Date, default: null }
});

export default mongoose.model<IStats>("stats", StatsSchema);