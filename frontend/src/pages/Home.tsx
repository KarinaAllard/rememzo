import { Link } from "react-router"
import { Button } from "../components/Button"

export const Home = () => {
    return (
        <div className="w-full flex flex-col">
            <h1 className="text-4xl text-(--text-hover) mb-6">Welcome to Rememzo</h1>
            <p>This is a memory DLE game, where you can test your memory retention and eye for detail.</p>
            <Link to="/play" className="block w-full mt-4">
                <Button className="w-full">Play</Button>
            </Link>
        </div>
    )
}