import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import ParticleBackground from "../components/ParticleBackground";

const MainLayout = () => {



    return (
        <div className="relative bg-white min-h-screen flex flex-col overflow-auto">
            <ParticleBackground />
            <div className="z-50 px-6 sm:px-12 md:px-24">
                <Header />
            </div>
            <div className="z-10 flex-1 px-6">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
