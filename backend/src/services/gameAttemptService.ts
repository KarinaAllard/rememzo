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

        const userObjectId = 
        userId
            ? typeof userId === "string"
                ? new mongoose.Types.ObjectId(userId)
                : userId
                : undefined;

        const sceneObjectId =
            typeof sceneId === "string"
                ? new mongoose.Types.ObjectId(sceneId)
                : sceneId;

        let attempt: IGameAttempt | null = null;

        if (userObjectId){
            const objectId = typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId;
            attempt = await GameAttempts.findOne({
                userId: userObjectId,
                sceneId: sceneObjectId,
                puzzleDate,
            })
        } else if (guestId) {
            attempt = await GameAttempts.findOne({
                guestId,
                sceneId: sceneObjectId,
                puzzleDate,
            });
        }

        if (attempt?.completed) {
            throw new Error("You have already completed today's attempt");
        }

        if (!attempt) {
            attempt = await GameAttempts.create({
                userId: userObjectId,
                guestId,
                sceneId: sceneObjectId,
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