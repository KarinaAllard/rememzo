import { Link } from "react-router"
import { Button } from "../components/Button"

export const Play = () => {
    return (
        <div className="w-full flex flex-col">
            <h1 className="text-4xl text-(--text-hover) mb-6">Daily Puzzle #1</h1>
            <p className="text-sm">2025-12-11</p>
            <Link to="/play/question" className="block w-full mt-4">
                <Button className="w-full">Start Game</Button>
            </Link>
        </div>
    )
}