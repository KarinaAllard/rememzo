import baseService from "./baseService";
import { handleRequest } from "./handleRequest";

export const fetchMe = (): Promise<{
    userId: string;
    email: string;
    streak: number;
    preferences: { language: string };
    stats: {
        totalGamesPlayed: number;
        totalWins: number;
        winrate: number;
        bestStreak: number;
        lastPlayed: string | null;
    }
}> => {
    return handleRequest(
        baseService.get("/me")
    );
}