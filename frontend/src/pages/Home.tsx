import { Link } from "react-router"
import { Button } from "../components/Button"
import { useTranslation } from "../hooks/useTranslation"
import { motion } from "framer-motion";
import { usePageMotion } from "../hooks/usePageMotion";

export const Home = () => {
    const { t } = useTranslation();
    const motionProps = usePageMotion();

    return (
        <motion.div {...motionProps} className="w-full flex flex-col max-w-md">
            <h1 className="text-4xl text-(--secondary-text) mb-6">{t("welcomeMsg")} <span className="decoration-3 underline underline-offset-4 decoration-(--cta)">Rememzo</span></h1>
            <p>{t("welcomeDesc")}</p>
            <Link to="/play" className="block w-full mt-4">
                <Button className="w-full">{t("play")}</Button>
            </Link>
        </motion.div>
    )
}