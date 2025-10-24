import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="fixed top-4 right-4 flex gap-2 z-50">
      <button
        onClick={() => changeLanguage("en")}
        className="px-3 py-1 bg-blue-200 rounded hover:bg-blue-300 transition-colors"
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("ru")}
        className="px-3 py-1 bg-blue-200 rounded hover:bg-blue-300 transition-colors"
      >
        RU
      </button>
    </div>
  );
}
