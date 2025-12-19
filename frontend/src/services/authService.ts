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

export const refreshToken = () => {
    const refreshToken = 
        localStorage.getItem("refreshToken") ||
        sessionStorage.getItem("refreshToken");

    if (!refreshToken) throw new Error("No refresh token available");

    return handleRequest(
        baseService.post("/auth/refresh", { token: refreshToken })
    )
}