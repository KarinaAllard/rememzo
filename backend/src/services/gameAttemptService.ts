import mongoose from "mongoose";
import GameAttempts, { IGameAttempt } from "../models/GameAttempts";

export class GameAttemptService {
    static async getOrCreateAttempt({
        userId,
        guestId,
        sceneId,
        puzzleDate,
        totalTimeMs,
    }: {
        userId?: mongoose.Types.ObjectId;
        guestId?: string;
        sceneId: mongoose.Types.ObjectId;
        puzzleDate: string;
        totalTimeMs: number;
    }): Promise<IGameAttempt> {
        if (!userId && !guestId) throw new Error("Must provide userId or guestId");

        let attempt = await GameAttempts.findOne({
            $or: [{ userId }, { guestId }],
            sceneId,
            puzzleDate,
            completed: false
        });

        if (!attempt) {
            attempt = await GameAttempts.create({
                userId,
                guestId,
                sceneId,
                puzzleDate,
                remainingMs: totalTimeMs
            });
        }

        return attempt;
    }

    static async updateRemainingMs(attemptId: string, remainingMs: number) {
        return GameAttempts.findByIdAndUpdate(
            attemptId,
            { remainingMs },
            { new: true }
        );
    }

    static async completeAttempt(attemptId: string) {
        return GameAttempts.findByIdAndUpdate(
            attemptId,
            { completed: true },
            { new: true }
        );
    }
}