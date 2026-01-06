import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { FlagEN, FlagSV } from "../icons/flags";
import { useToast } from "../context/ToastContext";
import { useUser } from "../context/UserContext";

export const MyAccount = () => {
    const navigate = useNavigate();
    const { user, refreshUser } = useUser();
    const { showToast } = useToast();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");

        refreshUser();
        showToast("You've been logged out", "info");
        navigate("/login", { replace: true });
    };

    const formatDate = (dateStr?: string | null) => {
        if (!dateStr) return "N/A";
        const date = new Date(dateStr);
        return date.toISOString().split("T")[0];
    };

    const streakClass = user?.streak && user.streak > 1 ? "text-(--success) font-bold text-lg" : "text-(--text-hover) font-bold text-lg";
    const winrateClass = user?.stats && user?.stats.winrate >= 0.5 ? "text-(--success) font-bold text-lg" : "text-(--text-hover) font-bold text-lg";

    return (
        <div className="w-full flex flex-col gap-2 max-w-md">
            <h1 className="text-4xl text-(--text-hover) mb-6">My Account</h1>
            <p className="text-sm mb-4 text-(--secondary-text)">Welcome! Here you can see your stats and preferences.</p>
            
            {user ? (
                <div className="flex flex-col gap-4 p-4 border border-neutral-800 mb-4 text-sm">
                    <p>Email: 
                        <span className="text-(--text-hover) font-bold text-lg"> {user.email}</span>
                    </p>
                    <p className="flex gap-2 items-center">
                        Language preference: 
                        {user.preferences.language === "sv" ? <FlagSV /> : <FlagEN />}
                        <span className="uppercase text-(--text-hover) font-bold text-lg">
                            {user.preferences.language}
                        </span>
                    </p>
                    <p>Current Streak: 
                        <span className={streakClass}> {user.streak}</span>
                    </p>
                    <div className="mt-4 p-3 border border-(--dark-cta) rounded-md flex flex-col gap-2 text-(--text)">
                        <h2 className="text-lg font-bold">Your Stats</h2>
                        <p>Total Games Played: 
                            <span className="text-(--text-hover) font-bold text-lg"> {user.stats?.totalGamesPlayed}</span>
                        </p>
                        <p>Total Wins: 
                            <span className="text-(--text-hover) font-bold text-lg"> {user.stats?.totalWins}</span>
                        </p>
                        <p>
                            Winrate: 
                            <span className={winrateClass}> {user.stats ? (user.stats.winrate * 100).toFixed(1) : "N/A"}%</span>
                        </p>
                        <p>Best Streak: 
                            <span className="text-(--text-hover) font-bold text-lg"> {user.stats?.bestStreak}</span>
                        </p>
                        <p>
                            Last Played: 
                            <span className="text-(--text-hover) font-bold text-lg"> {formatDate(user.stats?.lastPlayed)}</span>
                        </p>
                    </div>
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