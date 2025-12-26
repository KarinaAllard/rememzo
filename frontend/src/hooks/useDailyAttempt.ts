import { getOrCreateGuestId } from "../game/guest";
import { fetchDailyQuestion } from "../services/questionService";
import { startAttempt, completeAttempt } from "../services/gameService";
import { useToday } from "./useToday";

export const startDailyAttempt = async () => {
    const guestId = getOrCreateGuestId();
    const today = useToday();
    const sceneData = await fetchDailyQuestion(today);
    const attemptData = await startAttempt(guestId, sceneData._id, sceneData.date);

    return {
        attemptId: attemptData._id || attemptData.attemptId,
        remainingMs: attemptData.remainingMs,
    };
};

export const completeDailyAttempt = async (attemptId: string) => {
    return completeAttempt(attemptId);
};

export const isDailyAttemptCompleted = (puzzleDate: string) => {
    const guestId = getOrCreateGuestId();
    const attemptsRaw = sessionStorage.getItem("completedAttempts") || "{}";
    const attempts = JSON.parse(attemptsRaw);

    return Boolean(attempts[guestId]?.[puzzleDate]);
};

export const markDailyAttemptCompleted = (puzzleDate: string) => {
    const guestId = getOrCreateGuestId();
    const attemptsRaw = sessionStorage.getItem("completedAttempts") || "{}";
    const attempts = JSON.parse(attemptsRaw);

    attempts[guestId] = attempts[guestId] || {};
    attempts[guestId][puzzleDate] = true;

    sessionStorage.setItem("completedAttempts", JSON.stringify(attempts));
}