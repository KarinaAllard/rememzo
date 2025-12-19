import baseService from "./baseService";
import { handleRequest } from "./handleRequest";

export const fetchDailyQuestion = (date: string) =>
    handleRequest(
        baseService.get(`/play/daily?date=${date}`)
    );