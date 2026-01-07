import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { FlagEN, FlagSV } from "../icons/flags";
import { useToast } from "../context/ToastContext";
import { useUser } from "../context/UserContext";
import { useTranslation } from "../hooks/useTranslation";
import { useLanguage } from "../context/LanguageContext";
import { updateMyLanguage } from "../services/meService";

export const MyAccount = () => {
    const navigate = useNavigate();
    const { user, refreshUser } = useUser();
    const { showToast } = useToast();
    const { t } = useTranslation();
    const { lang, setLang } = useLanguage();

    const toggleLanguage = async () => {
        const newLang = lang === "en" ? "sv" : "en";
        setLang(newLang);

        if (user?.preferences) {
        try {
                await updateMyLanguage({ language: newLang });
                refreshUser();
                showToast(t("languageUpdated"), "success");
            } catch (err) {
                console.error("Failed to update language preference", err);
                showToast(t("languageUpdateFailed"), "error");
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");

        refreshUser();
        showToast(t("logoutSuccess"), "info");
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
            <h1 className="text-4xl text-(--secondary-text)">{t("my")} <span className="decoration-3 underline underline-offset-4 decoration-(--cta)">{t("account")}</span></h1>
            <p className="text-sm mb-4 text-(--secondary-text)">{t("myAccountDesc")}</p>
            
            {user ? (
                <div className="flex flex-col gap-4 p-4 border border-neutral-700 mb-4 text-sm shadow-[inset_0_2px_150px_rgba(var(--shadow-rgb),0.25)]">
                    <p>
                        <span className="border-2 border-transparent border-b-neutral-700 p-1 text-(--text) rounded-xs">{t("email")}:</span>
                        <span className="text-(--text-hover) font-bold text-lg"> {user.email}</span>
                    </p>
                    <p className="flex gap-2 items-center cursor-pointer" onClick={toggleLanguage}>
                        <span className="border-2 border-transparent border-b-neutral-700 p-1 text-(--text) rounded-xs">{t("languagePreference")}: </span>
                        {user.preferences.language === "sv" ? <FlagSV /> : <FlagEN />}
                        <span className="uppercase text-(--text-hover) font-bold text-lg">{user.preferences.language}</span>
                    </p>
                    <p>
                        <span className="border-2 border-transparent border-b-neutral-700 p-1 text-(--text) rounded-xs">{t("currentStreak")}:</span>
                        <span className={streakClass}> {user.streak}</span>
                    </p>
                    <div className="mt-4 p-3 border border-(--dark-cta) bg-neutral-900 rounded-xs flex flex-col gap-2 text-(--text-hover) shadow-[inset_0_2px_150px_rgba(var(--cta-rgb),0.1)]">
                        <h2 className="text-lg font-bold">{t("yourStats")}</h2>
                        <p>
                            <span className="border-2 border-transparent border-b-(--dark-cta) p-1 text-(--text) rounded-xs">{t("totalGamesPlayed")}:</span> 
                            <span className="text-(--text-hover) font-bold text-lg"> {user.stats?.totalGamesPlayed}</span>
                        </p>
                        <p>
                            <span className="border-2 border-transparent border-b-(--dark-cta) p-1 text-(--text) rounded-xs">{t("totalWins")}:</span> 
                            <span className="text-(--text-hover) font-bold text-lg"> {user.stats?.totalWins}</span>
                        </p>
                        <p>
                            <span className="border-2 border-transparent border-b-(--dark-cta) p-1 text-(--text) rounded-xs">{t("winrate")}:</span>
                            
                            <span className={winrateClass}> {user.stats ? (user.stats.winrate * 100).toFixed(1) : "N/A"}%</span>
                        </p>
                        <p>
                            <span className="border-2 border-transparent border-b-(--dark-cta) p-1 text-(--text) rounded-xs">{t("bestStreak")}:</span> 
                            <span className="text-(--text-hover) font-bold text-lg"> {user.stats?.bestStreak}</span>
                        </p>
                        <p>
                            <span className="border-2 border-transparent border-b-(--dark-cta) p-1 text-(--text) rounded-xs">{t("lastPlayed")}:</span> 
                            <span className="text-(--text-hover) font-bold text-lg"> {formatDate(user.stats?.lastPlayed)}</span>
                        </p>
                    </div>
                </div>
            ) : (
                <div>
                    <p>{t("noUserData")}</p>
                    <p></p>
                </div>
            )}

            <Button onClick={handleLogout} variant="secondary">
                {t("logOut")}
            </Button>
        </div>
    );
};