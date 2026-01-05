import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { Countdown } from "../components/Countdown";
import { useGame } from "../game/GameContext";
import { startDailyAttempt } from "../hooks/useDailyAttempt";
import { useToday } from "../hooks/useToday";
import { useGameController } from "../hooks/useGameController";
import { PlayScene } from "../components/PlayScene";
import { type IDailyPuzzle } from "../types/IGame";
import { fetchDailyPuzzle } from "../services/dailyPuzzleService";

export const Play = () => {
    const { phase, countdownRemainingMs, setCountdownRemainingMs, attemptId, setAttemptId } = useGame();
    const { goToPhase } = useGameController();
    const [dailyPuzzle, setDailyPuzzle] = useState<IDailyPuzzle | null>(null);
    const [loading, setLoading] = useState(false);
    const today = useToday();

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
                const data = await fetchDailyPuzzle(today);
                setDailyPuzzle(data);
            } catch (error) {
                console.error("Failed to load daily puzzle", error);
            }
        };
        fetchPuzzle();
    }, [today]);

    const handleStart = async () => { 
        if (attemptId) return;

        setLoading(true);
        try {
            const { attemptId: newAttemptId, remainingMs } = await startDailyAttempt();
            setAttemptId(newAttemptId);
            setCountdownRemainingMs(remainingMs);
            goToPhase("countdown");
        } catch (error: any) {
            if (error.response?.data?.error === "You have already completed today's attempt") {
                goToPhase("completed");
            } else {
                console.error(error);
            }
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
                        seconds={5} 
                        remainingMs={countdownRemainingMs ?? undefined}
                        setRemainingMs={setCountdownRemainingMs}
                        onComplete={handleCountdownComplete}
                    />
                    <PlayScene items={dailyPuzzle.items} />
                </>
            )}
        </div>
    )
}