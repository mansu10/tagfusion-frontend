import { Link } from "react-router-dom";
import Button from "./Button";

const Header = () => {
   return (
      <div className="w-full flex justify-between p-4">
         <Link to="/" className="w-fit flex items-center gap-1">
            <img src="/icons/logo.png" alt="logo" className="w-16 object-contain rounded" />
         </Link>

         <Link to="/web3">
            <Button text="launch app" className="hover:bg-gradient-red-orange hover:shadow-custom-shadow hover:border-0" />
         </Link>
      </div>
   )
};

export default Header;
