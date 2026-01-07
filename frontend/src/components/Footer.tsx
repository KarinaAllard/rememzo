import { useUser } from "../context/UserContext";
import { FlagEN, FlagSV } from "../icons/flags";
import { useLanguage } from "../context/LanguageContext";
import { updateMyLanguage } from "../services/meService";

export const Footer = () => {
  const { user, refreshUser } = useUser();
  const { lang, setLang } = useLanguage();

  const toggleLanguage = async () => {
    const newLang = lang === "en" ? "sv" : "en";
    setLang(newLang); 

    if (user?.preferences) {
      try {
        await updateMyLanguage({ language: newLang });
        refreshUser(); 
      } catch (err) {
        console.error("Failed to update language preference", err);
      }
    }
  };

  return (
    <footer className="w-full p-2 flex justify-center items-center border-t border-neutral-800 bg-(--background)">
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 text-sm text-(--secondary-text)"
      >
        {lang === "sv" ? <FlagSV /> : <FlagEN />}
        <span className="uppercase">{lang}</span>
      </button>
    </footer>
  );
};