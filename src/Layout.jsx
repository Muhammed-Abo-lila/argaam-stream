import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "./layouts/Footer/Footer";
import Header from "./Layouts/Header/Header";
import useLang from "./utils/useLang";

const Layout = () => {
  return (
    <>
    {/* for SEO */}
      <h1 className="d-none">
        <p>{useLang("Argaam Originals", "برامج أرقام الأصلية")}</p>
        <p>{useLang("Argaam video channels: Saudi and Gulf market analysis.", "قنوات أرقام المرئية — تحليل السوق السعودي والخليجي.")}</p>
      </h1>
      <ScrollRestoration />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
