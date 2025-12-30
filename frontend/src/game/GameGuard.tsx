import type { GamePhase } from "./gameTypes";
import { useGame } from "./GameContext";


type GameGuardProps = {
    allowed: GamePhase[];
    children: React.ReactNode;
}

export const GameGuard = (props: GameGuardProps) => {
    const { phase } = useGame();

    if (!props.allowed.includes(phase)) {
        return null;
    }

    return <>{props.children}</>
};