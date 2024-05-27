import { Link } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
   return (
      <div className="w-full h-full flex flex-col">

         <div className="w-full flex-1 flex justify-center items-center px-4">
            <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 md:gap-10">
               <div className="flex flex-col items-center gap-4 md:gap-2">
                  <h1
                     className="text-white text-3xl md:text-5xl text-center font-extrabold uppercase"
                  >
                     Empowering the Future: <span className="text-primary-default">Harnessing</span>

                  </h1>

                  <h2
                     className="text-white w-4/5 text-2xl uppercase md:text-4xl text-center font-bold "
                  >
                     Decentralized Identity Credit Services on the TURA Blockchain
                  </h2>
               </div>
               <div className="flex flex-row justify-center items-center gap-4 md:gap-8">
                  <Link to="/web3">
                     <Button text="launch app" className="w-[180px] h-[50px] gradient-button border-0" />
                  </Link>

                  <Link to="/web3">
                     <Button text="join discord" className="w-[180px] h-[50px] hover:bg-gradient-red-orange hover:shadow-custom-shadow hover:border-0" />
                  </Link>
               </div>
            </div>
         </div>


         <div className="flex justify-center items-center mt-auto py-4">
            <div className="flex flex-col justify-center items-center gap-1">
               <div
                  className="text-white/80 text-center font-semibold text-xl"
               >
                  Powered by <span className=" text-white font-bold pl-1 tracking-[8px] text-xl">Tura</span>
               </div>
               <div
                  className="text-white text-md text-center"
               >
                  As the first social application chain
               </div>
            </div>
         </div>
      </div>
   )
};

export default Home;
