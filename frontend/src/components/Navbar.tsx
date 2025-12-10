import { Link } from "react-router"

export const Navbar = () => {

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-center">
            <nav>
                <ul className="flex space-x-6">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/play">Play</Link></li>
                <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
    )
}