import type { GamePhase } from "./gameTypes";
import { useGame } from "./GameContext";
import { Navigate } from "react-router";


type GameGuardProps = {
    allowed: GamePhase[];
    children: React.ReactNode;
}

export const GameGuard = (props: GameGuardProps) => {
    const { phase } = useGame();

    if (!props.allowed.includes(phase)) {
        return <Navigate to="/play" replace />;
    }

    return <>{props.children}</>
};