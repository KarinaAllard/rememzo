import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { FlagEN, FlagSV } from "../icons/flags";
import { useToast } from "../context/ToastContext";
import { useUser } from "../context/UserContext";

export const MyAccount = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { showToast } = useToast();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");

        showToast("You've been logged out", "info");
        navigate("/login", { replace: true });
    };

    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="text-4xl text-(--text-hover) mb-6">My Account</h1>
            <p className="text-sm mb-4 text-(--secondary-text)">Welcome! Here you can see your stats and preferences.</p>
            
            {user ? (
                <div className="flex flex-col gap-4 p-4 border border-neutral-800 mb-4">
                    <p>Email: 
                        <span className="text-(--text-hover) font-semibold"> {user.email}</span>
                    </p>
                    <p className="flex gap-2">
                        Language preference: 
                        {user.preferences.language === "sv" ? <FlagSV /> : <FlagEN />}
                        <span className="uppercase text-(--text-hover) font-semibold">
                            {user.preferences.language}
                        </span>
                    </p>
                    <p>Current Streak: 
                        <span className="text-(--text-hover) font-semibold"> {user.streak}</span>
                    </p>
                </div>
            ) : (
                <p>No user data available</p>
            )}

            <Button onClick={handleLogout} variant="secondary">
                Log out
            </Button>
        </div>
    );
};