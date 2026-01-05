import baseService from "./baseService";
import { handleRequest } from "./handleRequest";
import type { IDailyPuzzle } from "../types/IGame";

export const fetchDailyPuzzle = (date: string): Promise<IDailyPuzzle> => 
     handleRequest(
        baseService.get(`/play/daily?date=${date}`)
    );