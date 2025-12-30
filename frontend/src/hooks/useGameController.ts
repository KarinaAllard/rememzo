import { useGame } from "../game/GameContext";
import type { GamePhase } from "../game/gameTypes";

export const useGameController = () => {
    const { phase, setPhase } = useGame();

    const goToPhase = (next: GamePhase) => {
        setPhase(next);
    };

    return { phase, goToPhase };
}