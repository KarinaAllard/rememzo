import { Link, useNavigate } from "react-router";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useState } from "react";
import { login } from "../services/authService";
import { LuEye, LuEyeClosed } from "../icons";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const emailError =
        email && !validateEmail(email)
            ? "Please enter a valid email address."
            : null;

    const hasLiveErrors = !!emailError;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        
        if (hasLiveErrors) {
            setSubmitError("Please fix the errors above.");
            return;
        }

        setLoading(true);
        try {
            const result = await login(email, password);
            localStorage.setItem("token", result.token);
            navigate("/my-account");
        } catch (error) {
            console.error("Login failed:", error);
            setSubmitError("Invalid email or password")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col">
            <h1 className="text-4xl text-(--text-hover) mb-6">Log in</h1>
            <p className="text-sm">To view your streak and other stats, log in here.</p>
            <form onSubmit={handleSubmit} className="flex flex-col mt-4 w-full">
                <p className="text-red-500 text-sm mt-1 min-h-4">{submitError}</p>
                <Input 
                    label="Email" 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="w-full"
                />
                <p className="text-xs text-yellow-400 min-h-4 mb-2">
                    {emailError}
                </p>
                <Input 
                    label="Password" 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    rightIcon={showPassword ? <LuEye /> : <LuEyeClosed/>}
                    onIconClick={() => setShowPassword(!showPassword)}
                    className="w-full"
                />
                <div className="mt-10 w-full">
                    <Button type="submit" className="w-full" loading={loading}>Log in</Button>
                </div>
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