import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useGame } from "../game/GameContext";

export const useResetGuestOnLogin = () => {
  const { user } = useUser();
  const { setAttemptId, setCountdownRemainingMs, setPhase } = useGame();

  useEffect(() => {
    if (!user) return;

    sessionStorage.removeItem("dailyPuzzleCountdown");
    sessionStorage.removeItem("dailyAttemptId");
    sessionStorage.removeItem("completedAttempts");

    setAttemptId(null);
    setCountdownRemainingMs(null);
    setPhase("idle");

  }, [user, setAttemptId, setCountdownRemainingMs, setPhase]);
};