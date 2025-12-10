import { Link, NavLink } from "react-router"
import logo from "../assets/logo-v5.png"
import mobileLogo from "../assets/mobile-logo-v5.png"

export const Navbar = () => {

    return (
        <header className="p-4 flex justify-between px-10 items-center">
            <Link to="/">
                <img src={logo} alt="Rememzo" className="hidden md:block w-[300px]" />
                <img src={mobileLogo} alt="Rememzo" className="block w-[115px] ml-1 md:hidden" />
            </Link>
            <nav>
                <ul className="flex gap-6 pt-3">
                <li><NavLink to="/play" className="hover:text-(--text-hover)">Play</NavLink></li>
                <li><NavLink to="/login" className="hover:text-(--text-hover)">Login</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}