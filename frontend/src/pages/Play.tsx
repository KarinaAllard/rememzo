import { useState } from "react";
import { Button } from "../components/Button"
import { Countdown } from "../components/Countdown";
import { useGame } from "../game/GameContext";
import { useGameFlow } from "../hooks/useGameFlow";
import { completeDailyAttempt, startDailyAttempt } from "../hooks/useDailyAttempt";
import { useToday } from "../hooks/useToday";

export const Play = () => {
    const { phase, setPhase, countdownRemainingMs, setCountdownRemainingMs } = useGame();
    useGameFlow();

    const [attemptId, setAttemptId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const today = useToday();

    const handleStart = async () => { 
        setLoading(true);
        try {
            const { attemptId, remainingMs } = await startDailyAttempt();
            setAttemptId(attemptId);
            setCountdownRemainingMs(remainingMs);
            setPhase("countdown");
        } catch (error: any) {
            alert(error.response?.data?.error || "Could not start game");
        } finally {
            setLoading(false)
        }
    };

    const handleCountdownComplete = async () => {
        if (!attemptId) return;
        try {
            await completeDailyAttempt(attemptId);
            setCountdownRemainingMs(null);
            setPhase("question");
        } catch (error: any) {
            alert(error.response?.data?.error || "Could not complete attempt");
        }
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
                    Start Game
                </Button>
            )}

            {phase === "countdown" && ( 
                <Countdown 
                    seconds={20} 
                    remainingMs={countdownRemainingMs ?? undefined}
                    setRemainingMs={setCountdownRemainingMs}
                    onComplete={handleCountdownComplete}
                />
            )}
        </div>
    )
}