import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "./layouts/Footer/Footer";
import Header from "./Layouts/Header/Header";
import HeroSection from "./Layouts/HeroSection/HeroSection";

const Layout = () => {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <HeroSection />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
