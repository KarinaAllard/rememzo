import { getOrCreateGuestId } from "../game/guest";
import { fetchDailyQuestion } from "../services/questionService";
import { startAttempt, completeAttempt } from "../services/gameService";
import { useToday } from "./useToday";
import { getAttemptIdentity } from "../game/identity";

export const startDailyAttempt = async () => {
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

export const completeDailyAttempt = async (attemptId: string) => {
    return completeAttempt(attemptId);
};

export const isDailyAttemptCompleted = (puzzleDate: string) => {
    const identity = getAttemptIdentity();

    if ("guestId" in identity) {
        const attemptsRaw = sessionStorage.getItem("completedAttempts") || "{}";
        const attempts = JSON.parse(attemptsRaw);

        return Boolean(attempts[identity.guestId]?.[puzzleDate]);
    }

    return false;

};

export const markDailyAttemptCompleted = (puzzleDate: string) => {
    const guestId = getOrCreateGuestId();
    const attemptsRaw = sessionStorage.getItem("completedAttempts") || "{}";
    const attempts = JSON.parse(attemptsRaw);

    attempts[guestId] = attempts[guestId] || {};
    attempts[guestId][puzzleDate] = true;

    sessionStorage.setItem("completedAttempts", JSON.stringify(attempts));
}