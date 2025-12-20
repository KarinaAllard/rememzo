import { useNavigate } from "react-router"
import { Button } from "../components/Button"
import { useState } from "react";
import { Countdown } from "../components/Countdown";

export const Play = () => {
    const navigate = useNavigate();
    const [isCountingdown, setIsCountingDown] = useState(false);

    return (
        <div className="w-full flex flex-col">
            <h1 className="text-4xl text-(--text-hover) mb-6">Daily Puzzle #1</h1>
            <p className="text-sm">2025-12-11</p>

            {!isCountingdown && (
                <Button 
                    className="w-full"
                    onClick={() => setIsCountingDown(true)}
                >
                    Start Game
                </Button>
            )}

            {isCountingdown && (
                <Countdown
                    seconds={3}
                    onComplete={() => navigate("/play/question")}
                />
            )}
        </div>
    )
}