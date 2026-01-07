import { Link } from "react-router"
import { Button } from "../components/Button"
import { useTranslation } from "../hooks/useTranslation"

export const Home = () => {
    const { t } = useTranslation();
    return (
        <div className="w-full flex flex-col max-w-md">
            <h1 className="text-4xl text-(--text-hover) mb-6">{t("welcomeMsg")}</h1>
            <p>{t("welcomeDesc")}</p>
            <Link to="/play" className="block w-full mt-4">
                <Button className="w-full">{t("play")}</Button>
            </Link>
        </div>
    )
}