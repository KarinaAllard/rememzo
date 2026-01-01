import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { fetchMe } from "../services/meService";

export const MyAccount = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ email: string; preferences: { language: string } } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await fetchMe();
                setUser(data);
            } catch (error: any) {
                setError(error.message || "Failed to fetch user");
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
        navigate("/login", { replace: true });
    };

    if (loading) return <p>Loading account info...</p>
    if (error) return <p className="text-(--dark-cta)">{error}</p>

    return (
        <div className="w-full flex flex-col">
            <h1 className="text-4xl text-(--text-hover) mb-6">My Account</h1>
            <p className="text-sm mb-4">Welcome! Here you'll eventually see your stats.</p>

            {user ? (
                <div>
                    <p>Email: {user.email}</p>
                    <p>Language preference: {user.preferences.language}</p>
                </div>
            ) : (
                <p>No user data available</p>
            )}

            <Button onClick={handleLogout} variant="secondary">
                Log out
            </Button>
        </div>
    );
};