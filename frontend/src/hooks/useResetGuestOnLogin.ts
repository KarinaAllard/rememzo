import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useGame } from "../game/GameContext";

export const useResetGuestOnLogin = () => {
  const { user } = useUser();
  const { attemptId, setAttemptId, setCountdownRemainingMs, setPhase } = useGame();

  useEffect(() => {
    if (!user) return;

    const guestId = sessionStorage.getItem("guestId");

    if (!guestId) return;

    sessionStorage.removeItem("guestId");
    sessionStorage.removeItem("dailyPuzzleCountdown");
    sessionStorage.removeItem("dailyAttemptId");
    sessionStorage.removeItem("completedAttempts");

    setAttemptId(null);
    setCountdownRemainingMs(null);
    setPhase("idle");
  }, [user, attemptId, setAttemptId, setCountdownRemainingMs, setPhase]);
};