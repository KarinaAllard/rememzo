import { Link, useNavigate } from "react-router";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useState } from "react";
import { register } from "../services/authService";
import { LuEye, LuEyeClosed } from "../icons/icons";
import { PasswordMeter } from "../components/PasswordMeter";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

export const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	useAuthRedirect(true);

	const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

	const emailError =
		email && !validateEmail(email)
			? "Please enter a valid email address."
			: null;

	const passwordError =
		password && password.length < 6
			? "Password must be at least 6 characters long."
			: null;

	const confirmPasswordError =
		confirmPassword && password !== confirmPassword
			? "Passwords do not match."
			: null;

	const hasLiveErrors =
		!!emailError || !!passwordError || !!confirmPasswordError;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitError(null);

		if (hasLiveErrors) {
			setSubmitError("Please fix the errors above.");
			return;
		}

		setLoading(true);
		try {
			const result = await register(email, password);
			localStorage.setItem("token", result.token);
			localStorage.setItem("refreshToken", result.refreshToken);
			navigate("/my-account");
		} catch (error: any) {
			console.error("Signup failed:", error);

			if (error?.response?.status === 409) {
				setSubmitError("Email already registered.");
			} else if (error?.response?.data?.error) {
				setSubmitError(error.response.data.error);
			} else {
				setSubmitError("Registration failed. Try again.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full flex flex-col">
			<h1 className="text-4xl text-(--text-hover) mb-6">Sign Up</h1>
			<p className="text-sm">
				To keep track of your stats and streak, register here.
			</p>
			<form onSubmit={handleSubmit} className="flex flex-col mt-4 w-full">
				<p className="text-(--cta) text-sm mt-1 min-h-4">{submitError}</p>
				<Input
					label="Email"
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full"
				/>
				<p className="text-xs text-(--shine) min-h-4 mb-2 italic opacity-90">
					{emailError}
				</p>
				<Input
					label="Password"
					type={showPassword ? "text" : "password"}
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					rightIcon={showPassword ? <LuEye /> : <LuEyeClosed />}
					onIconClick={() => setShowPassword(!showPassword)}
					className="w-full"
				/>
				<div className="min-h-4 mb-2 relative">
					<PasswordMeter password={password} />
					<p className="text-xs text-(--shine) absolute top-2 italic opacity-90">
						{passwordError}
					</p>
				</div>
				<Input
					label="Confirm Password"
					type={showPassword ? "text" : "password"}
					name="confirmPassword"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					rightIcon={showPassword ? <LuEye /> : <LuEyeClosed />}
					onIconClick={() => setShowPassword(!showPassword)}
					className="w-full"
				/>
				<p className="text-xs text-(--shine) min-h-4 mb-2 italic opacity-90">
					{confirmPasswordError}
				</p>
				<div className="mt-4 w-full">
					<Button type="submit" loading={loading} className="w-full">
						Sign Up
					</Button>
				</div>
			</form>
			<div className="mt-4">
				<p>Already have an account?</p>
				<p className="text-(--link) hover:text-(--link-hover) font-semibold">
					<Link to="/login">Log in here</Link>
				</p>
			</div>
		</div>
	);
};
