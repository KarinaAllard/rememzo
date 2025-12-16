import { Link, useLocation, useNavigate } from "react-router"
import { Button } from "../components/Button"

export const Result = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { selectedAnswer, isCorrect } = location.state || {};

    if (!selectedAnswer) {
        navigate("/")
        return null
    }

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-4xl text-(--text-hover) mb-6">Result</h1>
            <p>
                You selected: {selectedAnswer} -{" "}
                <span className={isCorrect ? "text-green-500" : "text-red-500"}>
                    {isCorrect ? "Correct!" : "Wrong!"}
                </span>
            </p>
            
            <Link to="/" className="block w-full mt-4">
                <Button className="w-full">Go back</Button>
            </Link>
        </div>
    )
}