import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

export const MyAccount = () => {
    const navigate = useNavigate();

    useAuthRedirect(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="w-full flex flex-col">
            <h1 className="text-4xl text-(--text-hover) mb-6">Coming soon..</h1>
            <p className="text-sm mb-4">Welcome! Here you'll eventually see your stats.</p>

            <Button onClick={handleLogout} variant="secondary">
                Log out
            </Button>
        </div>
    );
};