import { getOrCreateGuestId } from "../game/guest";
import { fetchDailyQuestion } from "../services/questionService";
import { startAttempt, completeAttempt } from "../services/gameService";

export const startDailyAttempt = async () => {
    const guestId = getOrCreateGuestId();
    const today = new Date().toISOString().slice(0, 10);
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