import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchMe } from "../services/meService";

type User = {
    email: string;
    preferences: { language: string };
    streak: number;
};

type UserContextType = {
    user: User | null;
    refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const refreshUser = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (!token) {
                setUser(null);
                return;
            }

            const data = await fetchMe();
            setUser(data);
        } catch (error) {
            console.error("Failed to fetch user", error);
            setUser(null);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within UserProvider");
    return ctx;
};