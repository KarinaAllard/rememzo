import baseService from "./baseService";
import { handleRequest } from "./handleRequest";

export const submitAttemptAnswer = async (
    attemptId: string,
    payload: { questionId: string, selectedOption: string; correct: boolean }
) => {
    return handleRequest(baseService.post(`/attempts${attemptId}/answer`, payload));
};

export const fetchAttemptResult = async (attemptId: string) => {
    return handleRequest(baseService.get(`/attempts/${attemptId}`));
};

export const fetchUserAttempts = async (userId: string) => {
    return handleRequest(baseService.get(`/attempts/user/${userId}`));
};

export const fetchLastAttempt = async (userId: string) => {
    return handleRequest(baseService.get(`/attempts/last/${userId}`));
};

export const fetchAttemptsByRange = async (
    userId: string,
    from?: string,
    to?: string
) => {
    const query = new URLSearchParams();
    if (from) query.append("from", from);
    if (to) query.append("to", to);
    return handleRequest(baseService.get(`/attempts/user/${userId}/range?${query}`));
};