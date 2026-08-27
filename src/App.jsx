import { useTranslation } from "react-i18next";
import useLang from "./utils/useLang";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const lang = useLang("en", "ar");
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="container mt-5">
      <h1 className="theme_text_identity" style={{ fontSize: "14px" }}>{lang === "en" ? "Home" : "الرئيسيه"}</h1>

      <button className="btn btn-info" onClick={() => changeLanguage(lang === "en" ? "ar" : "en")}>
        {lang === "en" ? "lang" : "اللغه"}
      </button>

      <button className="btn btn-info" onClick={toggleTheme}>
        {theme === "dark" ? "dark" : "light"}
      </button>
      <div className="row">
        <div className="col-6 theme_bg_main">Muhammad</div>
        <div className="col-6 theme_bg_secondary">Abo lila</div>
      </div>
    </div>
  )
}
export default App