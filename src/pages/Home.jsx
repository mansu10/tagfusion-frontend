import {Link, useNavigate} from "react-router-dom";
import Button from "../components/Button.jsx";
import { useState, useEffect } from "react";
import {turaChainId} from "../config/config.js";

const Home = () => {

   const [walletAddress, setWalletAddress] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      const address = localStorage.getItem("tura_address");
      setWalletAddress(address);
   }, []);

   const handleWalletButtonClick = async () => {
      if (walletAddress) {
         const confirmed = window.confirm("Confirm to log out of the current account?");
         if (confirmed) {
            localStorage.removeItem("tura_address");
            localStorage.removeItem("tura_login_status");
            setWalletAddress(null);
            navigate("/"); // 重定向到主页
         }
      } else {
         try {
            // 连接 Keplr 钱包
            if (!window.keplr) {
               alert("Please install Keplr extension");
               return;
            }

            const chainId = turaChainId;

            // 提示 Keplr 连接
            await window.keplr.enable(chainId);

            // 获取离线签名者
            const offlineSigner = window.getOfflineSigner(chainId);
            const accounts = await offlineSigner.getAccounts();

            // 假设新的地址是 accounts[0].address
            const newAddress = accounts[0].address;
            localStorage.setItem("tura_address", newAddress);
            setWalletAddress(newAddress);
         } catch (error) {
            console.error("Failed to connect to Keplr", error);
            alert("Failed to connect to Keplr");
         }
      }
   };

   return (
       <div className="w-full h-full flex flex-col">

          <div className="w-full flex flex-col justify-center items-center px-4 my-28">
             <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 md:gap-10 mt-28 text-center">
                <div id="tagfusion" className="flex flex-col gap-4 md:gap-0">
                   <h1 className="text-green-600 text-[8rem] font-extrabold leading-none">WHAT’S</h1>
                   <h1 className="text-green-600 text-[8rem] font-extrabold leading-none mt-0">TAGFUSION</h1>


                   <div className="flex justify-center">
                      <h2 className="mt-4 text-green-600 w-4/5 md:text-2xl font-medium leading-relaxed">
                         Tag Fusion Protocol is an innovative decentralized system that increases user creditworthiness by accumulating certified tags, which also serves as endorsements for individuals and win trust from others.
                      </h2>
                   </div>

                </div>
             </div>
          </div>

          {/*<div className="w-full flex-1 flex justify-center items-center px-4 mb-32">*/}
          {/*   <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 md:gap-12 mt-28">  /!* 增加 md:gap-10 到 md:gap-12 *!/*/}
          {/*      <div className="flex flex-col gap-6 md:gap-8 items-center">  /!* 增加 gap-4 到 gap-6 和 md:gap-2 到 md:gap-8 *!/*/}
          {/*         <Button*/}
          {/*             text={walletAddress ? "Exit Wallet" : "Connect Wallet"}*/}
          {/*             onClick={handleWalletButtonClick}*/}
          {/*             className="text-green-600 w-[600px] hover:bg-gradient-red-orange hover:shadow-custom-shadow hover:border-0"*/}
          {/*         />*/}
          {/*         <Link to="/card">*/}
          {/*            <Button text="set up your profile" link="/card" className="text-green-600 w-[600px] hover:bg-gradient-red-orange hover:shadow-custom-shadow hover:border-0" />*/}
          {/*         </Link>*/}
          {/*         <Link>*/}
          {/*            <Button text="Get some $TF" className="text-green-600 w-[600px] hover:bg-gradient-red-orange hover:shadow-custom-shadow hover:border-0" />*/}
          {/*         </Link>*/}
          {/*         <Link to="/create_tags">*/}
          {/*            <Button text="Create tags" link="/create_tags" className="text-green-600 w-[600px] hover:bg-gradient-red-orange hover:shadow-custom-shadow hover:border-0" />*/}
          {/*         </Link>*/}
          {/*      </div>*/}
          {/*   </div>*/}
          {/*</div>*/}
          <div className="w-full flex-1 flex justify-center items-center px-4 mb-32">
             <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 md:gap-12 mt-28">  {/* 增加 md:gap-10 到 md:gap-12 */}
                <div className="flex flex-col gap-6 md:gap-8 items-center">  {/* 增加 gap-4 到 gap-6 和 md:gap-2 到 md:gap-8 */}
                   <Button
                       text={walletAddress ? "Exit Wallet" : "Connect Wallet"}
                       onClick={handleWalletButtonClick}
                       className="text-green-600 w-[600px] transition-all duration-200 hover:shadow-[0_0_0_2px_#BE7123]"
                   />
                   <Link to="/card">
                      <Button text="set up your profile" link="/card" className="text-green-600 w-[600px] transition-all duration-200 hover:shadow-[0_0_0_2px_#BE7123]" />
                   </Link>

                   <a href="https://tagfusion.gitbook.io/announcement" target="_blank" rel="noopener noreferrer">
                      <Button text="Get Some Gas" className="text-green-600 w-[600px] transition-all duration-200 hover:shadow-[0_0_0_2px_#BE7123]" />
                   </a>


                   <Link to="/create_tags">
                      <Button text="Create tags" link="/create_tags" className="text-green-600 w-[600px] transition-all duration-200 hover:shadow-[0_0_0_2px_#BE7123]" />
                   </Link>
                </div>
             </div>
          </div>



          <div className="w-full flex-1 flex justify-center items-center px-4 mb-32 mt-30">
             <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 md:gap-10 mt-16 text-center">
                <div id="tagfusion" className="flex flex-col gap-4 md:gap-0">
                   {/*<h1 className="text-green-600 text-[8rem] font-extrabold leading-none mt-0">ABOUT</h1>*/}
                   <div className="flex justify-center">
                      <h2 className="mt-4 text-green-600 w-4/5 md:text-2xl font-medium leading-relaxed">
                         {/*Tag Fusion Protocol is an innovative decentralized system that enhances user credit through certification tags. Users earn certification tags by completing tasks or obtaining certificates, representing their abilities and credibility in specific fields.<br/><br/>*/}
                         The TagFusion Protocol is designed to enhance user credit through the use of certification tags. By completing tasks or obtaining certificates, users earn these certification tags, which serve as a representation of their abilities and credibility in specific fields. This unique approach not only validates the skills and expertise of individuals but also provides a trustworthy mechanism for others to assess their qualifications.<br/><br/>
                         These tags are not just identifiers but endorsements of skills and trustworthiness, helping users gain others' trust. By accumulating more certification tags, users' credit scores increase. Ensuring data transparency and privacy protection, user data is securely stored and shared, accessible only with authorization.<br/><br/>
                         Tag Fusion Protocol applies to various fields such as financial services, social networks, and recruitment platforms, where credit ratings and certification tags help users obtain loans, find jobs, or establish new relationships.
                      </h2>
                   </div>

                </div>
             </div>
          </div>



          <div className="flex justify-center items-center mt-28 py-4">
             <div className="flex flex-col justify-center items-center gap-1">
                <div className="text-green-600 text-center font-semibold text-xl">
                   Powered by TagFusion
                </div>
             </div>
          </div>



       </div>
   );
};

export default Home;
