import baseService from "./baseService";
import { handleRequest } from "./handleRequest";

export const fetchMe = (): Promise<{
    userId: string;
    email: string;
    streak: number;
    preferences: { language: string };
}> => {
    return handleRequest(
        baseService.get("/me")
    );
}