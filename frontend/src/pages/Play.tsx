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

export const Play = () => {
    const { phase, countdownRemainingMs, setCountdownRemainingMs, attemptId, setAttemptId } = useGame();
    const { goToPhase } = useGameController();
    const [dailyPuzzle, setDailyPuzzle] = useState<IDailyPuzzle | null>(null);
    const [loading, setLoading] = useState(false);
    const [itemsLibrary, setItemsLibrary] = useState<IItem[]>([]);
    const today = useToday();
    const { lang } = useLanguage();

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


    const handleStart = async () => { 
        if (attemptId && phase !== "completed") return;

        setLoading(true);
        try {
            let attempt;
            try {
                attempt = await startDailyAttempt();
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
            setCountdownRemainingMs(null);
            goToPhase("question");
    };

    return (
        <div className="w-full flex flex-col">
            <h1 className="text-4xl text-(--text-hover) mb-6">Daily Puzzle</h1>
            <p className="text-sm">{today}</p>

            {( phase === "idle" || phase === "paused") && (
                <Button 
                    className="w-full"
                    onClick={handleStart}
                    disabled={loading}
                >
                    {loading ? "Starting..." : "Start Game"}
                </Button>
            )}

            {/* TODO: Remember to change countdown time */}
            {phase === "countdown" && dailyPuzzle && ( 
                <>
                    <Countdown 
                        seconds={20} 
                        attemptId={attemptId || undefined}
                        remainingMs={countdownRemainingMs ?? undefined}
                        setRemainingMs={setCountdownRemainingMs}
                        onComplete={handleCountdownComplete}
                    />
                    <PlayScene 
                        items={dailyPuzzle.items} 
                        itemsById={itemsById}
                        backgroundRef={dailyPuzzle.template?.backgroundRef}
                    />
                </>
            )}
        </div>
    )
}