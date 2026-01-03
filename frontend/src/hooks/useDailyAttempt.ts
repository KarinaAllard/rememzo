import { fetchDailyQuestion } from "../services/questionService";
import { startAttempt, completeAttempt } from "../services/gameService";
import { useToday } from "./useToday";
import { getAttemptIdentity, type AttemptIdentity } from "../game/identity";

interface DailyAttemptData {
    attemptId: string;
    remainingMs: number;
}

export const startDailyAttempt = async (): Promise<DailyAttemptData> => {
    const today = useToday();
    const identity = getAttemptIdentity();
    const sceneData = await fetchDailyQuestion(today);

    const attemptData = await startAttempt({
        ...identity,
        sceneId: sceneData._id, 
        puzzleDate: sceneData.date,
    });

    return {
        attemptId: attemptData._id || attemptData.attemptId,
        remainingMs: attemptData.remainingMs,
    };
};

export const markDailyAttemptCompleted = async (
    puzzleDate: string,
    attemptId?: string
): Promise<void> => {
    const identity: AttemptIdentity = getAttemptIdentity();

    if ("guestId" in identity) {
        const attemptsRaw = sessionStorage.getItem("completedAttempts") || "{}";
        const attempts = JSON.parse(attemptsRaw);

        attempts[identity.guestId] = attempts[identity.guestId] || {};
        attempts[identity.guestId][puzzleDate] = true;
        
        sessionStorage.setItem("completedAttempts", JSON.stringify(attempts));
    }

    if ("userId" in identity && attemptId) {
        try {
            await completeAttempt(attemptId);
        } catch (error: any) {
            console.error("Failed to mark user attempt completed", error);
        }
    }
};

export const isDailyAttemptCompleted = (puzzleDate: string) => {
    const identity: AttemptIdentity = getAttemptIdentity();

    if ("guestId" in identity) {
        const attemptsRaw = sessionStorage.getItem("completedAttempts") || "{}";
        const attempts = JSON.parse(attemptsRaw);

        return Boolean(attempts[identity.guestId]?.[puzzleDate]);
    }

    return false;
};

export const completeDailyAttempt = async (attemptId: string) => {
    try {
        return await completeAttempt(attemptId);
    } catch (error: any) {
        console.error("Failed to complete attempt", error);
    }
};
