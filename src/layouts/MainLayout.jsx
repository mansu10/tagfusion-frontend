import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/'
  return (
    <>
      <div
        className={` bg-dark min-h-screen flex flex-col overflow-auto  ${
          isHome ? "bg-dark" : "bg-[#2b2b2b]"
        }`}
      >
        <div className="z-30 px-6 sm:px-12 md:px-24">
          <Header />
        </div>
        <div className="min-h-[calc(100vh-205px)]">
          <Outlet />
        </div>
        <Footer />
      </div>
      {!isHome && <div className="hidden md:block bgpoly"></div>}
    </>
  );
};

export default MainLayout;
