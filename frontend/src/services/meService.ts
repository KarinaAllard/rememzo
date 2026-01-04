import baseService from "./baseService";
import { handleRequest } from "./handleRequest";

export type Stats = {
  totalGamesPlayed: number;
  totalWins: number;
  winrate: number;
  bestStreak: number;
  lastPlayed: string | null;
};

export const fetchMe = (): Promise<{
    userId: string;
    email: string;
    streak: number;
    preferences: { language: string };
    stats: Stats;
}> => {
    return handleRequest(
        baseService.get("/me")
    );
}