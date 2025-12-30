import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { MyAccount } from "./pages/MyAccount";
import { NotFound } from "./pages/NotFound";
import { Play } from "./pages/Play";
import { Question } from "./pages/Question";
import { Result } from "./pages/Result";
import { Signup } from "./pages/Signup";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { GameGuard } from "./game/GameGuard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/play",
                element: 
                <GameGuard allowed={["idle", "paused", "countdown", "question"]}>
                    <Play />
                </GameGuard>
            },
            {
                path: "/play/question",
                element: 
                <GameGuard allowed={["question"]}>
                    <Question />
                </GameGuard>   
            },
            {
                path: "/play/result",
                element: 
                <GameGuard allowed={["result", "completed"]}>
                    <Result />
                </GameGuard>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/my-account",
                element: (
                    <ProtectedRoute>
                        <MyAccount />
                    </ProtectedRoute>
                )
            },
        ]
    }
])