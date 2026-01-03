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
        userId?: string | mongoose.Types.ObjectId;
        guestId?: string;
        sceneId: mongoose.Types.ObjectId;
        puzzleDate: string;
        totalTimeMs: number;
    }): Promise<IGameAttempt> {
        if (!userId && !guestId) throw new Error("Must provide userId or guestId");

        let attempt: IGameAttempt | null = null;

        if (userId){
            const objectId = typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId;
            attempt = await GameAttempts.findOne({
                userId: objectId,
                sceneId,
                puzzleDate,
            })
        } else if (guestId) {
            attempt = await GameAttempts.findOne({
                guestId,
                sceneId,
                puzzleDate,
            });
        }

        if (attempt?.completed) {
            throw new Error("You have already completed today's attempt");
        }

        if (!attempt) {
            attempt = await GameAttempts.create({
                userId: userId ? (typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId) : undefined,
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