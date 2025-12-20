import { useEffect, useState } from "react";

type CountdownProps = {
    seconds: number;
    onComplete: () => void;
};

export const Countdown = (props: CountdownProps) => {
    const [remainingMs, setRemainingMs] = useState(props.seconds * 1000);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingMs((prev) => {
                if (prev <= 50) {
                    clearInterval(interval);
                    props.onComplete();
                    return 0;
                }
                return prev -50;
            })
        }, 50);

        return () => clearInterval(interval);
    }, [props.onComplete]);

    const display = Math.max(remainingMs / 1000, 0).toFixed(2);

    return (

        <div className="text-6xl font-bold text-center">
            {display}
        </div>
    )
}