import { useUser } from "../context/UserContext";
import { FlagEN, FlagSV } from "../icons/flags";

export const Footer = () => {
  const { user } = useUser();
  const language = user?.preferences.language || "en";

  return (
    <footer className="w-full p-2 flex justify-center items-center border-t border-neutral-800 bg-(--background)">
      <div className="flex items-center gap-2 text-sm text-(--secondary-text)">
        {language === "sv" ? <FlagSV /> : <FlagEN />}
        <span className="uppercase">{language}</span>
      </div>
    </footer>
  );
};