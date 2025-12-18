import baseService from "./baseService";
import { handleRequest } from "./handleRequest";

export const login = (email: string, password: string) =>
    handleRequest(
        baseService.post("/auth/login", { email, password })
    );

export const register = (email: string, password: string) =>
    handleRequest(
        baseService.post("/auth/register", { email, password })
    );