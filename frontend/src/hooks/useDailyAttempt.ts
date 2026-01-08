import { startAttempt, completeAttempt, fetchAttemptForIdentity, updateRemainingAttempt } from "../services/gameService";
import { useToday } from "./useToday";
import { getAttemptIdentity, type AttemptIdentity } from "../game/identity";
import { fetchDailyPuzzle } from "../services/dailyPuzzleService";

interface DailyAttemptData {
    attemptId: string;
    remainingMs: number;
}

export const startDailyAttempt = async (lang: "en" | "sv"): Promise<DailyAttemptData> => {
    const today = useToday();
    const identity: AttemptIdentity = getAttemptIdentity();
    const sceneData = await fetchDailyPuzzle(today, lang);

    let attemptData: any = null;
   try {
        attemptData = await fetchAttemptForIdentity({ 
            userId: "userId" in identity ? identity.userId : undefined,
            guestId: "guestId" in identity ? identity.guestId : undefined,
            puzzleDate: today,
        });
    } catch (error: any) {
        if (error.response?.status === 404) {
            attemptData = null; 
        } else {
            throw error; 
        }
    }

    if (!attemptData) {
        attemptData = await startAttempt({
            userId: "userId" in identity ? identity.userId : undefined,
            guestId: "guestId" in identity ? identity.guestId : undefined,
            sceneId: sceneData._id,
            puzzleDate: sceneData.date,
        });
    }

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

export const isDailyAttemptCompleted = (puzzleDate: string): boolean => {
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


export const updateDailyAttemptRemaining = async (attemptId: string, remainingMs: number) => {
    try {
        return await updateRemainingAttempt(attemptId, remainingMs);
    } catch (error: any) {
        console.error("Failed to update remainingMs", error);
    }
};