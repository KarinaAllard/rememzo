import { useEffect, useRef } from "react";
import { useUser } from "../context/UserContext";
import { useGame } from "../game/GameContext";

export const useResetGuestOnLogin = () => {
  const { user } = useUser();
  const { setAttemptId, setCountdownRemainingMs, setPhase } = useGame();

  const hasResetRef = useRef(false);

  useEffect(() => {
    if (!user) return;
    if (hasResetRef.current) return;

    const guestId = sessionStorage.getItem("guestId");
    if (!guestId) return;

    hasResetRef.current = true;

    sessionStorage.removeItem("guestId");
    sessionStorage.removeItem("dailyPuzzleCountdown");
    sessionStorage.removeItem("dailyAttemptId");
    sessionStorage.removeItem("completedAttempts");

    setAttemptId(null);
    setCountdownRemainingMs(null);
    setPhase("idle");
  }, [user, setAttemptId, setCountdownRemainingMs, setPhase]);
};