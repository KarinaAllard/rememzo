import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

export const useTranslation = () => {
  const { lang } = useLanguage();

  const t = (key: keyof typeof translations["en"]) => {
    return translations[lang][key] || key;
  };

  return { t };
};