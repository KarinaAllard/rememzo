import baseService from "./baseService";
import { handleRequest } from "./handleRequest";
import type { IDailyPuzzle } from "../types/IGame";

export const fetchDailyPuzzle = (
    date: string,
    lang: "en" | "sv" = "en"
): Promise<IDailyPuzzle & { template?: { backgroundRef: string } }> => 
     handleRequest(
        baseService.get(`/play/daily?date=${date}&lang=${lang}`)
    );