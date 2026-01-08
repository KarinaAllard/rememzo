import { useGame } from "./GameContext";
import type { GamePhase } from "./gameTypes";

type GameGuardProps = {
    allowed: GamePhase[];
    children: React.ReactNode;
};

export const GameGuard = ({ allowed, children }: GameGuardProps) => {
    const { phase, hydrating } = useGame();

    if (hydrating) return <p className="text-center mt-10">Loading game...</p>;

    if (!allowed.includes(phase)) return null;

    return <>{children}</>;
};