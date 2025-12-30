import { Link, NavLink } from "react-router"
import logo from "../assets/logo-v6.png"
import mobileLogo from "../assets/mobile-logo-v6.png"

export const Navbar = () => {

    return (
        <header className="p-4 flex justify-between md:px-10 items-center w-full max-w-[2000px]">
            <Link to="/">
                <img src={logo} alt="Rememzo" className="hidden md:block w-[300px]" />
                <img src={mobileLogo} alt="Rememzo" className="block w-[115px] ml-1 md:hidden" />
            </Link>
            <nav>
                <ul className="flex gap-6 pt-3">
                <li><NavLink to="/play" className="text-(--link) hover:text-(--link-hover)">Play</NavLink></li>
                <li><NavLink to="/login" className="text-(--link) hover:text-(--link-hover)">Login</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}