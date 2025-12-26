import { Link, useNavigate } from "react-router"
import { Button } from "../components/Button"
import { useToday } from "../hooks/useToday"
import { isDailyAttemptCompleted } from "../hooks/useDailyAttempt"
import { useEffect } from "react"

export const Result = () => {
    const navigate = useNavigate()
    const today = useToday()

    const raw = sessionStorage.getItem("dailyResult");
    const result = raw ? JSON.parse(raw) : null;

    const completed = isDailyAttemptCompleted(today);

    useEffect(() => {
        if (!result && !completed) {
            navigate("/", { replace: true });
        }
    }, [result, completed, navigate]);

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-4xl text-(--text-hover) mb-6">Result</h1>
            {result ? (
                <p>
                    You selected: {result.selectedAnswer} -{" "}
                    <span className={result.isCorrect ? "text-green-500" : "text-red-500"}>
                        {result.isCorrect ? "Correct!" : "Wrong!"}
                    </span>
                </p>
            ) : (
                <p>
                    You have already completed today's puzzle!
                </p>
            )}
            
            <Link to="/" className="block w-full mt-4">
                <Button className="w-full">Go back</Button>
            </Link>
        </div>
    )
}