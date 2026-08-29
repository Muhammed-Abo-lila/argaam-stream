import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import useLang from "./utils/useLang";
import Footer from "./components/Footer";
import { useTheme } from "./context/ThemeContext";

const Layout = () => {
  const lang = useLang("en", "ar");
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const changeLanguage = (language) => {
    const pathParts = location.pathname.split("/");
    pathParts[1] = language;
    i18n.changeLanguage(language);
    navigate(pathParts.join("/"));
  };
  const { theme, toggleTheme } = useTheme()
  return (
    <>
      <button
        className="btn btn-info"
        onClick={() => changeLanguage(lang === "en" ? "ar" : "en")}
      >
        {lang === "en" ? "lang" : "اللغه"}
      </button>

      <button
        className="btn btn-info"
        onClick={() => toggleTheme(!theme)}
      >
        {theme === "light" ? "dark" : "light"}
      </button>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
