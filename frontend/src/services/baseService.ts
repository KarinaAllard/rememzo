import axios from "axios";
import { refreshToken } from "./authService";

const baseService = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

baseService.interceptors.request.use((config) => {
    const token = 
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

baseService.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url?.includes("/auth/refresh")) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("refreshToken");
            window.location.href = "/login";
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const result = await refreshToken();
                const newToken = result.token;

                if (localStorage.getItem("refreshToken")) {
                    localStorage.setItem("token", newToken);
                } else {
                    sessionStorage.setItem("token", newToken);
                }

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return baseService(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("refreshToken");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
)

export default baseService;