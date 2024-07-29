import {Link, useNavigate} from "react-router-dom";
import Button from "../components/Button.jsx";
import { useState, useEffect } from "react";
import {endpoint_rpc, tag_url, turaChainId} from "../config/config.js";
import StepCard from '../components/StepCard';
import {toast} from "react-toastify";
import {SigningStargateClient} from "@cosmjs/stargate";
const activateAccount = async () => {
   if (window.keplr) {
      await window.keplr.enable(turaChainId); // 替换为你的链 ID
   } else {
      toast.error("Please install the Keplr plug-in");
   }
   try {
      const chainId = turaChainId;
      const to_address = "tura137mg5gua8y6ppchvufg60ul6yl4dgxhnsxxc6e"
      const denom = "utura";
      const toSend = "1000000";
      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      const address = accounts[0].address;
      const signingClient = await SigningStargateClient.connectWithSigner(
          endpoint_rpc,
          offlineSigner
      );
      const fee = {
         amount: [{ denom: "utura", amount: "500" }],
         gas: "200000",
      };
      const memo = "";

      const result = await signingClient.sendTokens(
          address,
          to_address,
          [
             {
                denom: denom,
                amount: toSend,
             },
          ],
          fee,
          memo
      );
      if (result.code !== undefined && result.code !== 0) {
         throw new Error(`Error: ${result.log || result.rawLog}`);
      }
      toast.success(`Activate Successful`);
   } catch (error) {
      if (error.message === "Invalid string. Length must be a multiple of 4") {
         toast.success(`Activate Successful`);
      } else {
         toast.error(`Submit Error: ${error.message}`);
      }
   } finally {
      // Navigate to a different path or reset state
      // window.location.href = tag_url;
   }
};

const steps = [
   {
      stepNumber: "01",
      title: "Connect Wallet",
      description: (
          <>
             Download Keplr from app store or download the keplr google chrom extension. Add the Tura chain to kelpr first, then send out 0.01 Tura to{' '}
             <a href="#" onClick={activateAccount} className="underline"><strong>activate the account</strong></a>.
          </>
      ),
      linkText: "Guide",
      linkUrl: "https://tagfusion.gitbook.io/announcement/user-manual/wallet-connect",
   },
   {
      stepNumber: "02",
      title: "Set Your Profile",
      description: "Create your personal profile. Please make sure you have connected your kelpr wallet.",
      linkText: ".",
      linkUrl: "",
   },
   {
      stepNumber: "03",
      title: "Get Some Gas",
      description: (
          <>
             To get some gas, please apply our form, Or join our {' '}
             <a href="https://t.me/tagfusion" target="_blank" rel="noopener noreferrer" className="underline">
                <strong>Telegram</strong>
             </a>
             {' '}and send your keplr wallet address to the channel.
          </>
      ),
      linkText: "Apply form",
      linkUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfsxVaJhbctPg5sFbFP2QY63bpBYmomw8ranw3dJ-IyxadHZA/viewform",
   },
   {
      stepNumber: "04",
      title: "Create Tags",
      description: "Make sure your wallet has enough Tura, then create Tagger DAO as your first tag.",
      linkText: "Learn more",
      linkUrl: "https://tagfusion.gitbook.io/announcement/user-manual/create-tags",
   },
   {
      stepNumber: "05",
      title: "Verify Tags",
      description: (
          <>
             Choose the tag you want to verify, then copy your profile and send to our {' '}
             <a href="https://t.me/tagfusion" target="_blank" rel="noopener noreferrer" className="underline">
                <strong>Telegram</strong>
             </a>
             {' '}channel.
          </>
      ),
      linkText: "Learn more",
      linkUrl: "https://tagfusion.gitbook.io/announcement/user-manual/verify-tags",
   },
   {
      stepNumber: "06",
      title: "Tags Score Reward",
      description: "To confirm the rewards you received, you can find the reward info here.",
      linkText: "Learn more",
      linkUrl: "/award",
   },
];

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
                  <h1 className="text-green-600 text-6xl md:text-[8rem] font-extrabold leading-none">WHAT’S</h1>
                  <h1 className="text-green-600 text-6xl md:text-[8rem] font-extrabold leading-none mt-0">TAGFUSION</h1>
                  <div className="flex justify-center">
                     <h2 className="mt-4 text-green-600 w-full md:w-4/5 text-xl md:text-2xl font-medium leading-relaxed">
                        Tag Fusion Protocol is an innovative decentralized system that increases user creditworthiness by accumulating certified tags, which also serves as endorsements for individuals and win trust from others.
                     </h2>
                  </div>
               </div>
            </div>
         </div>

         <div className="w-full flex-1 flex justify-center items-center px-4 mb-32">
            <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 md:gap-12 mt-28">  {/* 增加 md:gap-10 到 md:gap-12 */}
               <div className="flex flex-col gap-6 md:gap-8 items-center">  {/* 增加 gap-4 到 gap-6 和 md:gap-2 到 md:gap-8 */}
                  <Button
                     text={walletAddress ? "Exit Wallet" : "Connect Wallet"}
                     onClick={handleWalletButtonClick}
                     className="text-green-600 w-full md:w-[600px] transition-all duration-200 hover:shadow-[0_0_0_2px_#BE7123]"
                  />

                  <Button text="set up your profile" link="/card" className="text-green-600 w-full md:w-[600px] transition-all duration-200 hover:shadow-[0_0_0_2px_#BE7123]" />

                  <Button text="Get Some Gas" link="https://docs.google.com/forms/d/e/1FAIpQLSfsxVaJhbctPg5sFbFP2QY63bpBYmomw8ranw3dJ-IyxadHZA/viewform" className="text-green-600 w-full md:w-[600px] transition-all duration-200 hover:shadow-[0_0_0_2px_#BE7123]" />

                  <Button text="Create tags" link="/create_tags" className="text-green-600 w-full md:w-[600px] transition-all duration-200 hover:shadow-[0_0_0_2px_#BE7123]" />

                  <Button text="Tags Score" link="/award" className="text-green-600 w-full md:w-[600px] transition-all duration-200 hover:shadow-[0_0_0_2px_#BE7123]" />
               </div>
            </div>
         </div>

         <div className="w-full flex-1 flex justify-center items-center px-4 mb-32 mt-28">
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {steps.map((step, index) => (
                  <StepCard
                     key={index}
                     stepNumber={step.stepNumber}
                     title={step.title}
                     description={step.description}
                     linkText={step.linkText}
                     linkUrl={step.linkUrl}
                  />
               ))}
            </div>
         </div>


         <div className="w-full flex-1 flex justify-center items-center px-4 mb-32 mt-30">
            <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 md:gap-10 mt-16 text-center">
               <div id="tagfusion" className="flex flex-col gap-4 md:gap-0">
                  {/*<h1 className="text-green-600 text-[8rem] font-extrabold leading-none mt-0">ABOUT</h1>*/}
                  <div className="flex justify-center">
                     <h2 className="mt-4 text-green-600 w-full md:w-4/5 text-xl md:text-2xl font-medium leading-relaxed">
                        The TagFusion Protocol is designed to enhance user credit through the use of certification tags. By completing tasks or obtaining certificates, users earn these certification tags, which serve as a representation of their abilities and credibility in specific fields. This unique approach not only validates the skills and expertise of individuals but also provides a trustworthy mechanism for others to assess their qualifications.<br /><br />
                        These tags are not just identifiers but endorsements of skills and trustworthiness, helping users gain others' trust. By accumulating more certification tags, users' credit scores increase. Ensuring data transparency and privacy protection, user data is securely stored and shared, accessible only with authorization.<br /><br />
                        Tag Fusion Protocol applies to various fields such as financial services, social networks, and recruitment platforms, where credit ratings and certification tags help users obtain loans, find jobs, or establish new relationships.
                     </h2>
                  </div>
               </div>
            </div>
         </div>

         <div className="flex justify-center items-center mt-28 py-4">
            <div className="flex flex-col justify-center items-center gap-1">
               <div className="text-green-600 text-center font-semibold text-xl">
                  Powered by TagFusion |&nbsp;
                  <a href="https://tagfusion.gitbook.io/announcement/user-manual/create-tags" target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold text-xl underline">
                     Docs
                  </a>
               </div>
            </div>
         </div>
      </div>

   );
};

export default Home;
