import { Button } from "../components/Button"
import { Countdown } from "../components/Countdown";
import { useGame } from "../game/GameContext";
import { useGameFlow } from "../hooks/useGameFlow";

export const Play = () => {
    const { phase, setPhase } = useGame();
    useGameFlow();

    const handleStart = () => setPhase("countdown");

    const handleCountdownComplete = () => {
        setPhase("question")
    };

    return (
        <div className="w-full flex flex-col">
            <h1 className="text-4xl text-(--text-hover) mb-6">Daily Puzzle #1</h1>
            <p className="text-sm">2025-12-11</p>

            {( phase === "idle" || phase === "paused") && (
                <Button 
                    className="w-full"
                    onClick={handleStart}
                >
                    Start Game
                </Button>
            )}

            {phase === "countdown" && <Countdown seconds={3} onComplete={handleCountdownComplete}/>}
        </div>
    )
}