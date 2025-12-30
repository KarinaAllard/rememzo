import { Link } from "react-router"
import { Button } from "../components/Button"
import { useToday } from "../hooks/useToday"
import { isDailyAttemptCompleted } from "../hooks/useDailyAttempt"

export const Result = () => {
    const today = useToday()

    const raw = sessionStorage.getItem("dailyResult");
    const result = raw ? JSON.parse(raw) : null;

    const completed = !result && isDailyAttemptCompleted(today);

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-4xl text-(--text-hover) mb-6">Result</h1>
            {result ? (
                <div className="flex flex-col items-center">
                    <p>
                        You selected: {result.selectedAnswer} -{" "}
                        <span className={result.isCorrect ? "text-(--success) font-bold" : "text-(--cta) font-bold"}>
                            {result.isCorrect ? "Correct!" : "Wrong!"}
                        </span>
                    </p>
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