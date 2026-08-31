import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "./layouts/Footer/Footer";
import Header from "./Layouts/Header/Header";

const Layout = () => {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
