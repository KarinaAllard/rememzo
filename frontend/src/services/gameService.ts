import baseService from "./baseService";
import { handleRequest } from "./handleRequest";

export const startAttempt = async ({
    userId,
    guestId,
    sceneId,
    puzzleDate,
}: {
    userId?: string;
    guestId?: string; 
    sceneId: string; 
    puzzleDate: string;
}) => {
    return handleRequest(baseService.post("/game/start", { userId, guestId, sceneId, puzzleDate }));
};

export const completeAttempt = async (attemptId: string) => {
    return handleRequest(baseService.patch(`/game/${attemptId}/complete`));
};