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

export const updateRemainingAttempt = async (attemptId: string, remainingMs: number) => {
    return handleRequest(
        baseService.patch(`/game/${attemptId}/update`, { remainingMs })
    );
};

export const fetchAttemptForIdentity = async ({
    userId,
    guestId,
    puzzleDate,
}: {
    userId?: string;
    guestId?: string;
    puzzleDate: string;
}) => {
    return handleRequest(
        baseService.get("/game/attempt", {
            params: { userId, guestId, puzzleDate },
        })
    );
};