import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CountdownProps = {
    seconds: number;
    onComplete: () => void;
};

export const Countdown = (props: CountdownProps) => {
    const [remainingMs, setRemainingMs] = useState(props.seconds * 1000);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingMs((prev) => {
                const next = Math.max(prev - 50, 0);
                return next;
            })
        }, 50);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (remainingMs === 0) {
            props.onComplete();
        }
    }, [remainingMs, props.onComplete]);

    const display = Math.max(remainingMs / 1000, 0).toFixed(2);
    const total = props.seconds * 1000;
    const fraction = remainingMs / total;

    const color = fraction <= 1/3
    ? "#f87171"
    : fraction < 2/3
    ? "#facc15"
    : "#22c55e";

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