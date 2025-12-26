import { Link, useLocation, useNavigate } from "react-router"
import { Button } from "../components/Button"
import { useToday } from "../hooks/useToday"
import { isDailyAttemptCompleted } from "../hooks/useDailyAttempt"
import { useEffect } from "react"

export const Result = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const today = useToday()

    const { selectedAnswer, isCorrect } = location.state || {};

    const completed = isDailyAttemptCompleted(today);

    useEffect(() => {
        if (!selectedAnswer && !completed) {
            navigate("/", { replace: true });
        }
    }, [selectedAnswer, completed, navigate]);

    if (!selectedAnswer && !completed) return null

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-4xl text-(--text-hover) mb-6">Result</h1>
            {selectedAnswer ? (
                <p>
                    You selected: {selectedAnswer} -{" "}
                    <span className={isCorrect ? "text-green-500" : "text-red-500"}>
                        {isCorrect ? "Correct!" : "Wrong!"}
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