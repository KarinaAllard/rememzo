import { Link } from "react-router"
import { Button } from "../components/Button"
import { useToday } from "../hooks/useToday"
import { isDailyAttemptCompleted } from "../hooks/useDailyAttempt"
import { useGame } from "../game/GameContext"
import { getAttemptIdentity } from "../game/identity"
import { useEffect, useState } from "react"
import { fetchAttemptResult, fetchLastAttempt } from "../services/attemptService"
import { Toast } from "../components/Toast"
import { useUser } from "../context/UserContext"

type ResultData = {
    selectedOption: string
    correct: boolean
}

export const Result = () => {
    const today = useToday()
    const { attemptId, phase } = useGame();
    const { user } = useUser();
    const identity = getAttemptIdentity();
    const showToast = phase === "result" || phase === "completed";
    
    const [result, setResult] = useState<ResultData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadResult = async () => {
            try {
                let response: any = null;

                if ("userId" in identity) {
                    if (attemptId) {
                        response = await fetchAttemptResult(attemptId);
                    } else {
                        response = await fetchLastAttempt(identity.userId);
                    }

                    if (response?.answer) {
                        setResult({
                            selectedOption: response.answer.selectedOption,
                            correct: response.answer.correct,
                        });
                    }

                } else {
                    const raw = sessionStorage.getItem("dailyResult");
                    setResult(raw ? JSON.parse(raw) : null);
                }
            } catch (error: any) {
                console.error("Failed to load result:", error);
            } finally {
                setLoading(false);
            }
        };

        loadResult();
    }, [attemptId, identity]);

    if (loading) {
        return <p>Loading result...</p>
    };

    const completed = !result && isDailyAttemptCompleted(today);

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-4xl text-(--text-hover) mb-6">Result</h1>
            {showToast && (
                <Toast duration={2500} variant="success">
                    Daily puzzle completed!
                </Toast>
            )}
            {result ? (
                <div className="flex flex-col items-center">
                    <p>
                        You selected: {result.selectedOption} -{" "}
                        <span className={result.correct ? "text-(--success) font-bold" : "text-(--cta) font-bold"}>
                            {result.correct ? "Correct!" : "Wrong!"}
                        </span>
                    </p>
                     {user && (
                        <p>
                            Current streak: <span>{user.streak}</span>
                        </p>
                    )}
                    <p>
                        Come back tomorrow to play again!
                    </p>
                </div>
            ) : completed ? (
                <p>
                    You have already completed today's puzzle!
                </p>
            ) : (
                <p>
                    No result available.
                </p>
            )}
            
            <Link to="/" className="block w-full mt-4">
                <Button className="w-full">Go back</Button>
            </Link>
        </div>
    )
}