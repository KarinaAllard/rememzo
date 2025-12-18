import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useAuthRedirect = (redirectIfLoggedIn = false) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

        if (redirectIfLoggedIn && token) {
            navigate("/my-account");
        } else if (!redirectIfLoggedIn && !token) {
            navigate("/login");
        }
    }, [navigate, redirectIfLoggedIn]);
};