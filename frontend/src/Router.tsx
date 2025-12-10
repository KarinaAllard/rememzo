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
                element: <Play />
            },
            {
                path: "/play/question",
                element: <Question />
            },
            {
                path: "/play/result",
                element: <Result />
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
                element: <MyAccount />
            },
    ]
    }
])