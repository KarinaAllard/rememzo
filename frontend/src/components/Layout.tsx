import { Outlet } from "react-router"
import { Navbar } from "./Navbar"

export const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen min-w-full items-center">
            <Navbar />
            <main className="flex grow mx-auto p-4">
                <Outlet />
            </main>
        </div>
    )
}