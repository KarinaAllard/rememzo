import { Link } from "react-router"
import { Button } from "../components/Button"
import { useToday } from "../hooks/useToday"
import { isDailyAttemptCompleted } from "../hooks/useDailyAttempt"
import { useGame } from "../game/GameContext"
import { getAttemptIdentity } from "../game/identity"
import { useEffect, useState } from "react"
import { fetchAttemptResult, fetchLastAttempt } from "../services/attemptService"
import { Toast } from "../components/Toast"
import { useUser } from "../context/UserContext"
import { useToast } from "../context/ToastContext"
import { TbReload } from "../icons/icons"
import { useTranslation } from "../hooks/useTranslation"
import { motion } from "framer-motion"
import { usePageMotion } from "../hooks/usePageMotion"


type ResultData = {
    selectedOption: string
    correct: boolean
}

export const Result = () => {
    const today = useToday()
    const { attemptId, phase } = useGame();
    const { user } = useUser();
    const identity = getAttemptIdentity();
    const identityUserId = "userId" in identity ? identity.userId : null;
    const showResultToast = phase === "result" || phase === "completed";
    const { showToast } = useToast();
    const { t } = useTranslation();
    const motionProps = usePageMotion();
    
    const [result, setResult] = useState<ResultData | null>(null);
    const [loading, setLoading] = useState(true);
    const [sessionOutdated, setSessionOutdated] = useState(false);

    useEffect(() => {
        const loadResult = async () => {
            try {
                let response: any = null;

                if (identityUserId) {
                    if (attemptId) {
                        response = await fetchAttemptResult(attemptId);
                    } else {
                        response = await fetchLastAttempt(identityUserId);
                    }

                    if (response?.answer) {
                        setResult({
                            selectedOption: response.answer.selectedOption,
                            correct: response.answer.correct,
                        });
                    }

                } else {
                    const raw = sessionStorage.getItem("dailyResult");
                    setResult(raw ? JSON.parse(raw) : null);

                    if (!raw && phase === "completed") {
                        showToast(
                            t("outdatedSession"),
                            "error"
                        );
                        setSessionOutdated(true);
                    }
                }
            } catch (error: any) {
                console.error("Failed to load result:", error);
            } finally {
                setLoading(false);
            }
        };

        loadResult();
    }, [attemptId, identityUserId]);

    if (loading) {
        return <p>{t("loadingResult")}</p>
    };
    

    const completed = !result && isDailyAttemptCompleted(today);

    return (
        <motion.div {...motionProps} className="w-full flex flex-col items-center max-w-md">
            <h1 className="text-4xl text-(--text-hover) mb-4 decoration-3 underline underline-offset-4 decoration-(--cta)">{t("result")}</h1>
            {showResultToast && (
                <Toast duration={2500} variant="success">
                    {t("dailyPuzzleCompleted")}
                </Toast>
            )}
            {result ? (
                <div className="flex flex-col items-center">
                    <p>
                        {t("youSelected")} {result.selectedOption} -{" "}
                        <span className={result.correct ? "text-(--success) font-bold" : "text-(--cta) font-bold"}>
                            {result.correct ? t("correct") : t("wrong")}
                        </span>
                    </p>
                     {user && (
                        <p>
                            {t("currentStreak")} <span>{user.streak}</span>
                        </p>
                    )}
                    <p>
                        {t("resultDesc")}
                    </p>
                </div>
            ) : completed ? (
                <p>
                    {t("dailyPuzzleCompleted")}
                </p>
            ) : (
                <p>
                    {t("noResultData")}
                </p>
            )}

            {sessionOutdated && (
                <div className="flex flex-col items-center w-full mt-4">
                    <div className="p-2 mb-2 bg-(--dark-cta) text-(--shine) rounded-sm flex flex-col items-center">
                        <h4 className="text-xl">{t("outdatedSession")}</h4>
                        <p className="text-sm">{t("reloadSession")}</p>
                    </div>
                    <Button 
                        onClick={() => window.location.reload()} 
                        variant="option"
                    >
                        <TbReload />
                    </Button>
                    </div>
            )}
            
            <Link to="/" className="block w-full mt-4">
                <Button className="w-full">{t("goBack")}</Button>
            </Link>
        </motion.div>
    )
}