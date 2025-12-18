import { Link, useNavigate } from "react-router"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { useState } from "react"
import { register } from "../services/authService"
import { LuEye, LuEyeClosed } from "../icons";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateEmail(email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password.length< 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            const result = await register(email, password);
            localStorage.setItem("token", result.token);
            navigate("/my-account");
        } catch (error) {
            console.error("Signup failed:", error);
            setError("Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col">
            <h1 className="text-4xl text-(--text-hover) mb-6">Sign Up</h1>
            <p className="text-sm">To keep track of your stats and streak, register here.</p>
            <form onSubmit={handleSubmit} className="flex flex-col mt-4 w-full">
                <Input 
                    label="Email" 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="w-full"
                />
                <Input 
                    label="Password" 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    rightIcon={showPassword ? <LuEye /> : <LuEyeClosed />}
                    onIconClick={() => setShowPassword(!showPassword)}
                    className="w-full"
                />
                <Input 
                    label="Confirm Password" 
                    type={showPassword ? "text" : "password"}  
                    name="confirmPassword" 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)}
                    rightIcon={showPassword ? <LuEye /> : <LuEyeClosed />}
                    onIconClick={() => setShowPassword(!showPassword)}
                    className="w-full"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <Button type="submit" loading={loading}>Sign Up</Button>
            </form>
            <div className="mt-4">
                <p>Already have an account?</p>
                <p className="text-(--link) hover:text-(--link-hover) font-semibold">
                    <Link to="/login">Log in here</Link>
                </p>
            </div>
        </div>
    )
}