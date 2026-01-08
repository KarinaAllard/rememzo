import { Link, useNavigate } from "react-router";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useState } from "react";
import { login } from "../services/authService";
import { LuEye, LuEyeClosed } from "../icons/icons";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import { useToast } from "../context/ToastContext";
import { useUser } from "../context/UserContext";
import { useTranslation } from "../hooks/useTranslation";
import { usePageMotion } from "../hooks/usePageMotion";
import { motion } from "framer-motion";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const { showToast } = useToast();
	const { refreshUser } = useUser();
	const { t } = useTranslation();
	const motionProps = usePageMotion();
	const navigate = useNavigate();

	useAuthRedirect(true);

	const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

	const emailError =
		email && !validateEmail(email)
			? t("emailError")
			: null;

	const hasLiveErrors = !!emailError;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitError(null);

		if (hasLiveErrors) {
			setSubmitError(t("submitError"));
			return;
		}

		setLoading(true);
		try {
			const result = await login(email, password);
			if (rememberMe) {
				localStorage.setItem("token", result.token);
				localStorage.setItem("refreshToken", result.refreshToken);
			} else {
				sessionStorage.setItem("token", result.token);
				sessionStorage.setItem("refreshToken", result.refreshToken);
			}

			await refreshUser();
			navigate("/my-account", { replace: true });
			showToast(t("loginSuccess"), "success");
		} catch (error) {
			console.error(t("loginFail"), error);
			setSubmitError(t("invalidInfo"));
			showToast(t("loginFail"), "error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<motion.div {...motionProps} className="w-full flex flex-col max-w-md">
			<h1 className="text-4xl text-(--secondary-text)">{t("log")} <span className="decoration-3 underline underline-offset-4 decoration-(--cta)">{t("in")}</span></h1>
			
			<p className="text-sm">
				{t("loginDesc")}
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
				<div className="flex items-center mb-4">
					<input
						type="checkbox"
						name="rememberMe"
						id="rememberMe"
						checked={rememberMe}
						onChange={(e) => setRememberMe(e.target.checked)}
						className="mr-2 accent-(--cta)"
					/>
					<label htmlFor="rememberMe" className="text-sm text-(--text)">
						{t("rememberMe")}
					</label>
				</div>
				<div className="mt-10 w-full">
					<Button type="submit" className="w-full" loading={loading}>
						{t("login")}
					</Button>
				</div>
			</form>
			<div className="mt-4">
				<p>{t("notRegisteredYet")}</p>
				<p className="text-(--link) hover:text-(--text-hover) hover:underline underline-offset-4 decoration-(--cta)">
					<Link to="/signup">{t("signUpHere")}</Link>
				</p>
			</div>
		</motion.div>
	);
};
