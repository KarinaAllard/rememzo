import { useEffect, useState } from "react";

type CountdownProps = {
    seconds: number;
    onComplete: () => void;
};

export const Countdown = (props: CountdownProps) => {

    const [current, setCurrent] = useState(props.seconds);

    useEffect(() => {
        if (current === 0) {
            props.onComplete();
            return;
        }

        const timer = setTimeout(() => {
            setCurrent(current - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [current, props.onComplete]);

    return (

        <div>
            {current}
        </div>
    )
}