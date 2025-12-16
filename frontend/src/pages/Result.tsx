import { Link, useLocation, useNavigate } from "react-router"
import { Button } from "../components/Button"

export const Result = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { selectedAnswer } = location.state || {}

    if (!selectedAnswer) {
        navigate("/")
        return null
    }

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-4xl text-(--text-hover) mb-6">Result</h1>
            <p>You selected: {selectedAnswer}</p>
            
            <Link to="/" className="block w-full mt-4">
                <Button className="w-full">Go back</Button>
            </Link>
        </div>
    )
}