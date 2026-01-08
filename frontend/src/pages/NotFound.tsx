import { Link } from "react-router"
import { Button } from "../components/Button"
import { useTranslation } from "../hooks/useTranslation"
import { usePageMotion } from "../hooks/usePageMotion";
import { motion } from "framer-motion";

export const NotFound = () => {
    const { t } = useTranslation();
    const motionProps = usePageMotion();
    return (

        <motion.div {...motionProps} className="w-full flex flex-col max-w-md">
            <h1 className="text-4xl text-(--secondary-text) decoration-3 underline underline-offset-4 decoration-(--cta)">Oops!</h1>
            <p className="mb-6">{t("notFoundDesc")}</p>
            <Button>
                <Link to="/">{t("goBack")}</Link>
            </Button>
        </motion.div>

    )
}