import { useNavigate } from "react-router";
import { useGame } from "../game/GameContext";
import { useEffect } from "react";

export const useGameFlow = () => {
    const { phase } = useGame();
    const navigate = useNavigate();

    useEffect(() => {
        switch (phase) {
            case "question":
                navigate("/play/question");
                break;
            case "result":
                navigate("/play/result");
                break;
            default:
                break;
        }
    }, [phase, navigate]);
};