import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { useGameFlow } from "../hooks/useGameFlow";
import { Footer } from "./Footer";
import { useGame } from "../game/GameContext";

export const Layout = () => {
    useGameFlow();
    const { phase } = useGame();
    const isPlayPhase = phase === "countdown";

    return (
        <div className="flex flex-col min-h-screen w-full items-center overflow-x-hidden p-4">
            <Navbar />
                <main
                className={`flex grow mt-12 justify-center w-full max-w-full`}
                >
                <div
                    className={`w-full ${
                    isPlayPhase ? "max-w-[90vw] md:max-w-3xl" : "max-w-md"
                    } flex flex-col items-center`}
                >
                    <Outlet />
                </div>
                </main>
            <Footer />
        </div>
    );
};