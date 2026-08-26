import { useTranslation } from "react-i18next";
import useLang from "./utils/useLang";

function App() {
  const { i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const lang = useLang("en", "ar");
  return (
    <div className="container">
      <h1 className="theme_text_color">{lang === "en" ? "hello" : "مرحبا"}</h1>
      <button className="btn btn-info" onClick={() => changeLanguage("en")}>
        {lang === "en" ? "en" : "الانجليزيه"}
      </button>
      <button className="btn btn-primary" onClick={() => changeLanguage("ar")}>
        {lang === "en" ? "ar" : "العربيه"}
      </button>
    </div>
  )
}

export default App
