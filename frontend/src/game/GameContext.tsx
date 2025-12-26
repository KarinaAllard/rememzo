import { createContext, useContext, useState } from "react";
import type { GamePhase } from "./gameTypes";

type GameContextValue = {
    phase: GamePhase;
    setPhase: (phase: GamePhase) => void;
    countdownRemainingMs: number | null;
    setCountdownRemainingMs: (ms: number | null) => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [phase, setPhase] = useState<GamePhase>("idle");
    const [countdownRemainingMs, setCountdownRemainingMs] = useState<number | null>(null);

    return (
        <GameContext.Provider value={{ phase, setPhase, countdownRemainingMs, setCountdownRemainingMs }}>
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