import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import ParticleBackground from "../components/ParticleBackground";

const MainLayout = () => {
   return (
      <div className="relative bg-black h-screen flex flex-col overflow-auto">
         <ParticleBackground />
         <div className="z-10">
            <Header />
         </div>
         <div className="z-10 flex-1">
            <Outlet />
         </div>
      </div>
   )
};

export default MainLayout;
