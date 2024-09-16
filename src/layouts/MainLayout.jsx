import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/'

  return (
    <div
      className={
        " bg-dark min-h-screen flex flex-col overflow-auto " + isHome
          ? "bg-dark"
          : "bg-gradient-bg"
      }
    >
      <div className="z-50 px-6 sm:px-12 md:px-24">
        <Header />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
