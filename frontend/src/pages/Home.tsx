import { Link } from "react-router"
import { Button } from "../components/Button"

export const Home = () => {
    return (
        <div className="flex-col justify-center">
            <h1 className="text-6xl">Welcome to Rememzo</h1>
            <p>This is a memory DLE game, where you can test your memory retention and eye for detail.</p>
            <Button><Link to="/play">Play</Link></Button>
        </div>
    )
}