import { Link } from "react-router"
import logo from "../assets/logo-v3.png"

export const Navbar = () => {

    return (
        <header className="p-4 flex justify-between px-10 items-center">
            <img src={logo} alt="Rememzo" className="w-[300px]" />
            <nav>
                <ul className="flex gap-6 pt-3">
                <li><Link to="/" className="hover:text-(--text-hover)">Home</Link></li>
                <li><Link to="/play" className="hover:text-(--text-hover)">Play</Link></li>
                <li><Link to="/login" className="hover:text-(--text-hover)">Login</Link></li>
                </ul>
            </nav>
        </header>
    )
}