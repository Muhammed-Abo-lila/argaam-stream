import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
// Set language direction on language change
i18n.on("languageChanged", (locale) => {
  const direction = i18n.dir(locale);
  document.body.dir = direction;
  document.documentElement.lang = locale;
});
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    detection: {
      order: ["path", "localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });
export default i18n;
