import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

export const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return props.children;
}