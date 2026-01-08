import { Link } from "react-router";
import { Button } from "../components/Button";
import { useTranslation } from "../hooks/useTranslation";
import { motion } from "framer-motion";
import { usePageMotion } from "../hooks/usePageMotion";

export const Home = () => {
    const { t } = useTranslation();
    const motionProps = usePageMotion();

    return (
        <motion.div {...motionProps} className="w-full flex flex-col max-w-md mx-auto p-4 space-y-6">
            <h1 className="text-4xl font-bold text-(--secondary-text)">
                {t("welcomeMsg")} <span className="decoration-3 underline underline-offset-4 decoration-(--cta)">Rememzo</span>
            </h1>
            <p className="text-(--secondary-text)">
                {t("welcomeDesc")}
            </p>

            <div className="border border-(--dark-cta) bg-neutral-900 rounded-xs flex flex-col gap-2 text-(--text-hover) shadow-[inset_0_2px_150px_rgba(var(--cta-rgb),0.1)] p-4">
                <h2 className="font-semibold text-(--secondary-text) text-xl">{t("homeHowToTitle")} <span className="decoration-3 underline underline-offset-4 decoration-(--cta)">Rememzo</span></h2>
                <ul className="list-disc list-inside space-y-4 text-(--text) text-sm">
                    <li>{t("homeBullet1")}</li>
                    <li>{t("homeBullet2")}</li>
                    <li>{t("homeBullet3")}</li>
                </ul>
            </div>

            <Link to="/play" className="block w-full">
                <Button className="w-full">{t("play")}</Button>
            </Link>

            <p className="text-sm text-(--secondary-text)/70 text-center">
                {t("homeTagline")}
            </p>
        </motion.div>
    );
};