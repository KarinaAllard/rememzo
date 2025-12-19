export const useAuth = () => {
    const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

    return {
        isAuthenticated: !!token,
    };
};