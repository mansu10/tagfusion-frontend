import { Link } from "react-router-dom";
import TFButton from "./TFButton";

const Header = () => {
    return (
      <div className="fixed top-0 left-0 right-0 w-full flex justify-center items-center h-[98px] text-white z-40">
        <div className="flex justify-between w-full max-w-[1240px]">
          <div className="flex items-center max-w-[1240px]">Tagfusion</div>
          <div className="hidden md:flex items-center">
            <div className="flex">
              <div className="w-[48px] h-[48px] ml-[20px] bg-white"></div>
              <div className="w-[48px] h-[48px] ml-[20px] bg-white"></div>
              <div className="w-[48px] h-[48px] ml-[20px] bg-white"></div>
            </div>
            <TFButton className="ml-[30px]" link="/my">My Tags</TFButton>
          </div>
          <div className="md:hidden">icon</div>
        </div>
      </div>
    );
};

export default Header;
