import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";

export const useAuthRedirect = (redirectIfLoggedIn = false) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {

        if (redirectIfLoggedIn && isAuthenticated) {
            navigate("/my-account", { replace: true });
        } else if (!redirectIfLoggedIn && !isAuthenticated) {
            navigate("/login", { replace: true });
        }
    }, [navigate, redirectIfLoggedIn, isAuthenticated]);
};