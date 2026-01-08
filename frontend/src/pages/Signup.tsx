import { Link, useNavigate } from "react-router";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useState } from "react";
import { register } from "../services/authService";
import { LuEye, LuEyeClosed } from "../icons/icons";
import { PasswordMeter } from "../components/PasswordMeter";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import { useToast } from "../context/ToastContext";
import { useTranslation } from "../hooks/useTranslation";
import { motion } from "framer-motion";
import { usePageMotion } from "../hooks/usePageMotion";

export const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { showToast } = useToast();
	const { t } = useTranslation();
	const motionProps = usePageMotion();

	useAuthRedirect(true);

	const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

	const emailError =
		email && !validateEmail(email)
			? t("emailError")
			: null;

	const passwordError =
		password && password.length < 6
			? t("passwordError")
			: null;

	const confirmPasswordError =
		confirmPassword && password !== confirmPassword
			? t("confirmPasswordError")
			: null;

	const hasLiveErrors =
		!!emailError || !!passwordError || !!confirmPasswordError;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitError(null);

		if (hasLiveErrors) {
			setSubmitError(t("submitError"));
			return;
		}

		setLoading(true);
		try {
			const result = await register(email, password);
			localStorage.setItem("token", result.token);
			localStorage.setItem("refreshToken", result.refreshToken);

			showToast(t("signUpSuccess"), "success");
			navigate("/my-account", { replace: true });
		} catch (error: any) {
			console.error("Signup failed:", error);

			if (error?.response?.status === 409) {
				setSubmitError(t("emailAlreadyRegistered"));
				showToast(t("emailAlreadyRegistered"), "error");
			} else if (error?.response?.data?.error) {
				setSubmitError(error.response.data.error);
				showToast(error.response.data.error, "error");
			} else {
				setSubmitError(t("registrationFailed"));
				showToast(t("registrationFailed"), "error");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<motion.div {...motionProps} className="w-full flex flex-col max-w-md">
			<h1 className="text-4xl text-(--secondary-text)"><span className="decoration-3 underline underline-offset-4 decoration-(--cta)">{t("sign")}</span> {t("up")}</h1>
			<p className="text-sm">
				{t("signUpDesc")}
			</p>
			<form onSubmit={handleSubmit} className="flex flex-col mt-4 w-full">
				<p className="text-(--cta) text-sm mt-1 min-h-4">{submitError}</p>
				<Input
					label={t("email")}
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
					label={t("password")}
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
					label={t("confirmPassword")}
					type={showPassword ? "text" : "password"}
					name="confirmPassword"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					className="w-full"
				/>
				<p className="text-xs text-(--shine) min-h-4 mb-2 italic opacity-90">
					{confirmPasswordError}
				</p>
				<div className="mt-4 w-full">
					<Button type="submit" loading={loading} className="w-full">
						{t("signUp")}
					</Button>
				</div>
			</form>
			<div className="mt-4">
				<p>{t("alreadyAccount")}</p>
				<p className="text-(--link) hover:text-(--text-hover) hover:underline underline-offset-4 decoration-(--cta)">
					<Link to="/login">{t("logInHere")}</Link>
				</p>
			</div>
		</motion.div>
	);
};
