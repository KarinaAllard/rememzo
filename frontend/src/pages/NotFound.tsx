import { Link } from "react-router"
import { Button } from "../components/Button"
import { Navbar } from "../components/Navbar"

export const NotFound = () => {
    return (

        <div className="flex flex-col min-h-screen min-w-full items-center">
            <Navbar />
            <main className="flex grow mx-auto p-4 max-w-md w-full mt-12">
                <div className="w-full flex flex-col">
                    <h1 className="text-4xl text-(--text-hover) mb-6">Oops!</h1>
                    <p>I have no memory of this place.</p>
                    <Button>
                        <Link to="/">Go back</Link>
                    </Button>
                </div>
            </main>
        </div>
    )
}