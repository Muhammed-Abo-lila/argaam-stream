import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import useLang from "./utils/useLang";

const Layout = () => {
  const lang = useLang("en", "ar");
  const { i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <button
        className="btn btn-info"
        onClick={() => changeLanguage(lang === "en" ? "ar" : "en")}
      >
        {lang === "en" ? "lang" : "اللغه"}
      </button>
      <Outlet />
    </>
  );
};

export default Layout;
