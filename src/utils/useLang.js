import { useTranslation } from "react-i18next";
const useLang = (en, ar) => {
  const { i18n } = useTranslation();
  return i18n.language === "en" ? en : ar;
};
export default useLang;