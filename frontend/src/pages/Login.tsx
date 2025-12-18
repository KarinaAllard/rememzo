import { Link, useNavigate } from "react-router";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useState } from "react";
import { login } from "../services/authService";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const result = await login(email, password);
            localStorage.setItem("token", result.token);
            navigate("/my-account");
        } catch (error) {
            console.error("Login failed:", error);
            setError("Invalid email or password")
        }
    };

    return (
        <div className="w-full flex flex-col">
            <h1 className="text-4xl text-(--text-hover) mb-6">Log in</h1>
            <p className="text-sm">To view your streak and other stats, log in here.</p>
            <form onSubmit={handleSubmit} className="flex flex-col mt-4">
                <Input label="Email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                <Input label="Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <Button type="submit" className="w-full">Log in</Button>
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