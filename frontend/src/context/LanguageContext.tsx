import { createContext, useContext, useState } from "react";

type Language = "en" | "sv";

type LanguageContextValue = {
    lang: Language;
    setLang: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type LanguageProviderProps = {
    children: React.ReactNode;
    initialLang?: Language;
};

export const LanguageProvider = ({
    children,
    initialLang = "en",
}: LanguageProviderProps) => {
    const [lang, setLang] = useState<Language>(initialLang);

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};