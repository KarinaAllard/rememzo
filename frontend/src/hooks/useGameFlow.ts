import { useLocation, useNavigate } from "react-router";
import { useGame } from "../game/GameContext";
import { useEffect } from "react";

export const useGameFlow = () => {
    const { phase } = useGame();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const isPlayRoute = location.pathname.startsWith("/play"); 

        if (!isPlayRoute) return;

        switch (phase) {
            case "idle":
            case "paused":
            case "countdown":
                if (location.pathname !== "/play") {
                    navigate("/play", { replace: true });
                }
                break;
            case "question":
                if (location.pathname !== "/play/question") {
                    navigate("/play/question", { replace: true });
                }
                break;
            case "result":
            case "completed":
                if (location.pathname !== "/play/result") {
                    navigate("/play/result", { replace: true });
                }
                break;
        }
    }, [phase, navigate, location.pathname]);
};