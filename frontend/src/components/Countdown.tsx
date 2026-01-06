import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { updateDailyAttemptRemaining } from "../hooks/useDailyAttempt";

type CountdownProps = {
    seconds: number;
    attemptId?: string;
    onComplete: () => void;
    remainingMs?: number;
    setRemainingMs?: (ms: number) => void;
};

export const Countdown = (props: CountdownProps) => {
    const storageKey = "dailyPuzzleCountdown";

    const initialMs = props.remainingMs ?? (() => {
        const savedMs = sessionStorage.getItem(storageKey);
        return savedMs ? parseInt(savedMs) : props.seconds * 1000;
    })();

    const [remainingMs, setRemainingMsState] = useState<number>(initialMs);

    const lastUpdateRef = useRef<number>(Date.now());

    // TODO: Implement backend-based daily attempt validation later, keep this during development for testing

    useEffect(() => {
        if (props.setRemainingMs) props.setRemainingMs(remainingMs);
    }, [remainingMs, props]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingMsState((prev) => {
                const next = Math.max(prev - 50, 0);
                sessionStorage.setItem(storageKey, next.toString());

                if (props.attemptId && Date.now() - lastUpdateRef.current >= 1000) {
                    updateDailyAttemptRemaining(props.attemptId, next).catch(console.error);
                    lastUpdateRef.current = Date.now();
                }

                if (next === 0) {
                    sessionStorage.removeItem(storageKey);
                }
                return next;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [props.attemptId]);

    useEffect(() => {
        if (remainingMs === 0) {
            props.onComplete();
        }
    }, [remainingMs, props.onComplete]);

    const display = Math.max(remainingMs / 1000, 0).toFixed(2);
    const total = props.seconds * 1000;
    const fraction = remainingMs / total;

    const color = fraction <= 1/5
    ? "#c9215f"
    : fraction < 3/5
    ? "#d4d4d4"
    : "#36dea0";

    return (

        <div className="flex justify-center items-center h-32">
                <motion.div 
                    animate={{ scale: remainingMs / 1000 <= 1 ? [1, 1.1, 1] : 1, color }}
                    transition={{ 
                        duration: 0.6,
                        repeat: remainingMs / 1000 <= 1 ? Infinity : 0,
                        repeatType: "reverse",
                    }}
                    className="text-6xl font-bold"
                >
                    {display}
                </motion.div>
        </div>
    )
}