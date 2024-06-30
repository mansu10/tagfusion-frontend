import { useEffect } from "react";
import {Link, useLocation} from "react-router-dom";
import Button from "../components/Button.jsx";

const Home = () => {
   const location = useLocation();

   useEffect(() => {
      if (location.hash) {
         const element = document.getElementById(location.hash.substring(1));
         if (element) {
            element.scrollIntoView({ behavior: "smooth" });
         }
      }
   }, [location]);

   return (
       <div className="w-full h-full flex flex-col">

          <div className="w-full flex-1 flex justify-center items-center px-4 mb-32">
             <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 md:gap-10 mt-16">
                <div id="tagfusion" className="flex flex-col gap-4 md:gap-0">
                   <h1 className="ml-16 text-white text-3xl md:text-5xl font-extrabold pl-1">TagFusion</h1>
                   <div className="flex justify-center">
                      <h2 className="mt-12 text-white w-4/5 md:text-3xl font-bold leading-relaxed text-justify">
                         Data is the key, tag is the future.<br/><br/>
                         Tag Fusion Protocol is an innovative decentralized system that increases user creditworthiness by accumulating certified tags, which also serves as endorsements for individuals and win trust from others.
                      </h2>
                   </div>
                </div>
             </div>
          </div>

          <div className="w-full flex-1 flex justify-center items-center px-4 mb-32">
             <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 md:gap-10 mt-16">
                <div className="flex flex-col gap-4 md:gap-2">
                   <h1 id="about" className="text-center text-white text-3xl md:text-5xl font-extrabold">About</h1>
                   <div className="flex justify-center">
                      <h2 className="text-white w-4/5 md:text-3xl font-bold leading-relaxed text-justify">
                         Tag Fusion Protocol is an innovative decentralized system that enhances user credit through certification tags. Users earn certification tags by completing tasks or obtaining certificates, representing their abilities and credibility in specific fields.<br/><br/>
                         These tags are not just identifiers but endorsements of skills and trustworthiness, helping users gain others' trust. By accumulating more certification tags, users' credit scores increase. Ensuring data transparency and privacy protection, user data is securely stored and shared, accessible only with authorization.<br/><br/>
                         Tag Fusion Protocol applies to various fields such as financial services, social networks, and recruitment platforms, where credit ratings and certification tags help users obtain loans, find jobs, or establish new relationships.
                      </h2>
                   </div>
                </div>
             </div>
          </div>



          <div className="w-full flex-1 flex justify-center items-center px-4 mb-32">
             <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 md:gap-10 mt-16">
                <div className="flex flex-col gap-4 md:gap-2 items-center">
                   <h1 id="about" className="text-center text-white text-3xl md:text-5xl font-extrabold">how to tag</h1>
                   <Link >
                      <Button text="create a wallet"  className="w-[600px] hover:bg-gradient-red-orange hover:shadow-custom-shadow hover:border-0" />
                   </Link>
                   <Link >
                      <Button text="set up your profile"  className="w-[600px] hover:bg-gradient-red-orange hover:shadow-custom-shadow hover:border-0" />
                   </Link>
                   <Link >
                      <Button text="Get some $TF"  className="w-[600px] hover:bg-gradient-red-orange hover:shadow-custom-shadow hover:border-0" />
                   </Link>
                   <Link to="/create_tags">
                      <Button text="Create tags" link="/create_tags" className="w-[600px] hover:bg-gradient-red-orange hover:shadow-custom-shadow hover:border-0" />
                   </Link>
                </div>
             </div>
          </div>


          <div className="flex justify-center items-center mt-auto py-4">
             <div className="flex flex-col justify-center items-center gap-1">
                <div className="text-white/80 text-center font-semibold text-xl">
                   Powered by <span className="text-white font-bold pl-1 tracking-[8px] text-xl">Tura</span>
                </div>
                <div className="text-white text-md text-center">As the first social application chain</div>
             </div>
          </div>


       </div>
   );
};

export default Home;
