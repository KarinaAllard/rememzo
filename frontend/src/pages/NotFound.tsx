import { Link } from "react-router"
import { Button } from "../components/Button"

export const NotFound = () => {
    return (
        <>
            <h1>I have no memory of this place</h1>
            <Button><Link to="/">Go back</Link></Button>
        </>
    )
}