import { createContext, useContext, useState, useEffect } from "react";
import type { GamePhase } from "./gameTypes";
import { isDailyAttemptCompleted } from "../hooks/useDailyAttempt";
import { useToday } from "../hooks/useToday";

type GameContextValue = {
    phase: GamePhase;
    setPhase: (phase: GamePhase) => void;
    countdownRemainingMs: number | null;
    setCountdownRemainingMs: (ms: number | null) => void;
    attemptId: string | null;
    setAttemptId: (id: string | null) => void;
    hydrating: boolean;
    readyForResult: boolean;
    setReadyForResult: (val: boolean) => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [phase, setPhase] = useState<GamePhase>("idle");
    const [countdownRemainingMs, setCountdownRemainingMs] = useState<number | null>(null);
    const [attemptId, setAttemptId] = useState<string | null>(null);
    const [hydrating, setHydrating] = useState(true);
    const [readyForResult, setReadyForResult] = useState(false);

    const today = useToday();

    useEffect(() => {
        const storedAttemptId = sessionStorage.getItem("dailyAttemptId");
        if (storedAttemptId && !attemptId) {
            setAttemptId(storedAttemptId);
        }

        const timeout = setTimeout(() => setHydrating(false), 50);

        return () => clearTimeout(timeout);
    }, [attemptId, setAttemptId]);

    useEffect(() => {
        if (isDailyAttemptCompleted(today)) {
            setPhase("completed");
        }
    }, [today]);

    return (
        <GameContext.Provider
        value={{
            phase,
            setPhase,
            countdownRemainingMs,
            setCountdownRemainingMs,
            attemptId,
            setAttemptId,
            hydrating,
            readyForResult,
            setReadyForResult
        }}
        >
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