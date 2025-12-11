import { Link } from "react-router"
import { Button } from "../components/Button"
import { Input } from "../components/Input"

export const Login = () => {
    return (
        <div className="w-full flex flex-col">
            <h1 className="text-4xl text-(--text-hover) mb-6">Log in</h1>
            <p className="text-sm">To view your streak and other stats, log in here.</p>
            <form className="flex flex-col mt-4">
                <Input label="Email" type="email" name="email" />
                <Input label="Password" type="password" name="password" />
                <Button type="submit">Log in</Button>
            </form>
            <div className="mt-4">
                <p>Not registered yet? </p>
                <p className="text-(--link) hover:text-(--link-hover) font-semibold">
                    <Link to="/signup">Sign up here</Link>
                </p>
            </div>
        </div>
    )
}