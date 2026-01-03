import { useState } from "react";
import { Button } from "../components/Button"
import { Countdown } from "../components/Countdown";
import { useGame } from "../game/GameContext";
import { completeDailyAttempt, startDailyAttempt } from "../hooks/useDailyAttempt";
import { useToday } from "../hooks/useToday";
import { useGameController } from "../hooks/useGameController";

export const Play = () => {
    const { phase, countdownRemainingMs, setCountdownRemainingMs, attemptId, setAttemptId } = useGame();
    const { goToPhase } = useGameController();

    const [loading, setLoading] = useState(false);
    const today = useToday();

    const handleStart = async () => { 
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

    // TODO - remove alert

    const handleCountdownComplete = async () => {
        if (!attemptId) return;
        try {
            await completeDailyAttempt(attemptId);
            setCountdownRemainingMs(null);
            goToPhase("question");
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