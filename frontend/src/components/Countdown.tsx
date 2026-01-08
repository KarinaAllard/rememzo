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

        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                <motion.div 
                    animate={{
                        borderColor: color,
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: fraction <= 1/5 ? Infinity : 0,
                        repeatType: "reverse",
                    }}
                    className="bg-(--background-transparent) py-1 px-2 rounded-xs border border-(--hover-text)"
                >
                    <motion.span
                        animate={{ scale: remainingMs / 1000 <= 1 ? [1, 1.1, 1] : 1, color }}
                        transition={{ 
                            duration: 0.6,
                            repeat: remainingMs / 1000 <= 1 ? Infinity : 0,
                            repeatType: "reverse",
                        }}
                        className="text-6xl md:text-5xl sm:text-4xl font-bold"
                    >
                        {display}
                    </motion.span>
                </motion.div>
        </div>
    )
}