import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/Button"
import { Countdown } from "../components/Countdown";
import { useGame } from "../game/GameContext";
import { startDailyAttempt } from "../hooks/useDailyAttempt";
import { useToday } from "../hooks/useToday";
import { useGameController } from "../hooks/useGameController";
import { PlayScene } from "../components/PlayScene";
import { type IDailyPuzzle } from "../types/IGame";
import { fetchDailyPuzzle } from "../services/dailyPuzzleService";
import type { IItem } from "../types/IItemLibrary";
import { fetchItemsLibrary } from "../services/itemLibraryService";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import { useRef } from "react";
import { SceneWipe } from "../components/SceneWipe";

export const Play = () => {
    const { phase, countdownRemainingMs, setCountdownRemainingMs, attemptId, setAttemptId } = useGame();
    const { goToPhase } = useGameController();
    const [dailyPuzzle, setDailyPuzzle] = useState<IDailyPuzzle | null>(null);
    const [loading, setLoading] = useState(false);
    const [itemsLibrary, setItemsLibrary] = useState<IItem[]>([]);
    const [wipe, setWipe] = useState(false);
    const today = useToday();
    const { lang } = useLanguage();
    const { t } = useTranslation();
    const playSceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedAttemptId = sessionStorage.getItem("dailyAttemptId");
        if (storedAttemptId && !attemptId) {
            setAttemptId(storedAttemptId);
        }
    }, [attemptId, setAttemptId]);

    useEffect(() => {
        if (attemptId) sessionStorage.setItem("dailyAttemptId", attemptId);
    }, [attemptId]);

    useEffect(() => {
        const fetchPuzzle = async () => {
            try {
                const data = await fetchDailyPuzzle(today, lang);
                setDailyPuzzle(data);
            } catch (error) {
                console.error("Failed to load daily puzzle", error);
            }
        };
        fetchPuzzle();
    }, [today, lang]);

    useEffect(() => {
        fetchItemsLibrary()
            .then(setItemsLibrary)
            .catch(err => console.error("Failed to load item library", err));
    }, []);

    const itemsById = useMemo(() => {
        return new Map(itemsLibrary.map(item => [item._id, item]));
    }, [itemsLibrary]);

    useEffect(() => {
        if (phase === "countdown") {
            playSceneRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [phase]);


    const handleStart = async () => { 
        if (attemptId && phase !== "completed") return;

        setLoading(true);
        try {
            let attempt;
            try {
                attempt = await startDailyAttempt(lang);
            } catch (error: any) {
                if (error.response?.data?.error === "You have already completed today's attempt") {
                    goToPhase("completed");
                    return;
                }
                throw error;
            }

            setAttemptId(attempt.attemptId);
            setCountdownRemainingMs(attempt.remainingMs);
            goToPhase("countdown");
        } catch (error: any) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCountdownComplete = async () => {
            setWipe(true);
            setCountdownRemainingMs(null);
    };

    return (
        <div className="w-full flex flex-col">
            <h1 className="text-4xl text-(--secondary-text) mb-4">{t("daily")} <span className="decoration-3 underline underline-offset-4 decoration-(--cta)">{t("puzzle")}</span></h1>
            <p className="text-xs mb-4 bg-neutral-900 w-fit p-1 rounded-xs border border-neutral-700">{today}</p>

            {( phase === "idle" || phase === "paused") && (
                <Button 
                    className="w-full"
                    onClick={handleStart}
                    disabled={loading}
                >
                    {loading ? t("starting") : t("startGame")}
                </Button>
            )}

            {/* TODO: Remember to change countdown time */}
            {phase === "countdown" && dailyPuzzle && ( 
                <div className="relative">
                    <Countdown 
                        seconds={20} 
                        attemptId={attemptId || undefined}
                        remainingMs={countdownRemainingMs ?? undefined}
                        setRemainingMs={setCountdownRemainingMs}
                        onComplete={handleCountdownComplete}
                    />
                    <div ref={playSceneRef} className="max-w-3xl flex flex-col justify-center w-full">
                        <PlayScene 
                            items={dailyPuzzle.items} 
                            itemsById={itemsById}
                            backgroundRef={dailyPuzzle.template?.backgroundRef}
                        />
                        {wipe && (
                            <SceneWipe
                            trigger={wipe}
                            onComplete={() => goToPhase("question")}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}