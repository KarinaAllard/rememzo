import { Link } from "react-router"
import { Button } from "../components/Button"
import { Input } from "../components/Input"

export const Signup = () => {
    return (
        <div className="w-full flex flex-col">
            <h1 className="text-4xl text-(--text-hover) mb-6">Sign Up</h1>
            <p className="text-sm">To keep track of your stats and streak, register here.</p>
            <form className="flex flex-col mt-4">
                <Input label="Email" type="email" name="email" />
                <Input label="Password" type="password" name="password" />
                <Input label="Confirm Password" type="password" name="password" />
                <Button type="submit">Log in</Button>
            </form>
            <div className="mt-4">
                <p>Already have an accoumt?</p>
                <p className="text-(--link) hover:text-(--link-hover) font-semibold">
                    <Link to="/login">Log in here</Link>
                </p>
            </div>
        </div>
    )
}