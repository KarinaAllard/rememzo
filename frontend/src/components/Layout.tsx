import { Outlet } from "react-router"
import { Navbar } from "./Navbar"
import { useGameFlow } from "../hooks/useGameFlow"
import { Footer } from "./Footer";

export const Layout = () => {
    useGameFlow();
    
    return (
        <div className="flex flex-col min-h-screen min-w-full items-center">
            <Navbar />
            <main className="flex grow mx-auto p-4 max-w-md w-full mt-12">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}