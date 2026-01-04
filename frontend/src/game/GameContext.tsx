import { createContext, useContext, useState } from "react";
import type { GamePhase } from "./gameTypes";
import { isDailyAttemptCompleted } from "../hooks/useDailyAttempt";
import { useToday } from "../hooks/useToday";
import { useEffect } from "react";

type GameContextValue = {
    phase: GamePhase;
    setPhase: (phase: GamePhase) => void;
    countdownRemainingMs: number | null;
    setCountdownRemainingMs: (ms: number | null) => void;
    attemptId: string | null;
    setAttemptId: (id: string | null) => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [phase, setPhase] = useState<GamePhase>("idle");
    const [countdownRemainingMs, setCountdownRemainingMs] = useState<number | null>(null);
    const [attemptId, setAttemptId] = useState<string | null>(null);

    const today = useToday();

    useEffect(() => {
        if (isDailyAttemptCompleted(today)) {
            setPhase("completed");
        }
    }, []);

    return (
        <GameContext.Provider value={{ phase, setPhase, countdownRemainingMs, setCountdownRemainingMs, attemptId, setAttemptId }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within GameProvider");
    }
    return context;
};