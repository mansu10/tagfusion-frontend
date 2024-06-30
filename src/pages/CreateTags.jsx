import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SigningStargateClient, assertIsBroadcastTxSuccess, GasPrice } from "@cosmjs/stargate";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateTags = () => {
   const [selectedTag, setSelectedTag] = useState(null);
   const [keplrLoaded, setKeplrLoaded] = useState(false);
   const navigate = useNavigate();
   const tags = ['eth', 'bt', '1']; // 你可以根据需要修改这个数组

   useEffect(() => {
      const loadKeplr = async () => {
         if (window.keplr) {
            await window.keplr.enable("turatest"); // 替换为你的链 ID
            setKeplrLoaded(true);
         } else {
            toast.error("请安装 Keplr 插件");
         }
      };
      loadKeplr();
   }, []);

   const handleClick = (tag) => {
      setSelectedTag(tag);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (selectedTag) {
         if (!keplrLoaded) {
            toast.error("Keplr 未加载");
            return;
         }

         try {
            const chainId = "turatest"; // 替换为你的链 ID
            const address = localStorage.getItem('tura_address');
            if (!address) {
               toast.error("在本地存储中找不到地址。");
               return;
            }
            console.log(address);

            const toAddress = address;



            const denom = "uTURA";
            const toSend = "100000000"; // 最小交易金额

            const offlineSigner = window.getOfflineSigner(chainId);
            const signingClient = await SigningStargateClient.connectWithSigner(
                "http://43.135.26.222:26657", // 替换为你的节点 RPC URL
                offlineSigner
            );

            const fee = {
               amount: [{ denom: "uTURA", amount: "500" }], // 调整为你的交易费用
               gas: "200000",
            };

            const memo = JSON.stringify({
               tag_version: "tag1.0",
               type: "addTag",
               tag_name: selectedTag
            });

            const result = await signingClient.sendTokens(
                address,
                toAddress,
                [
                   {
                      denom: denom,
                      amount: toSend,
                   },
                ],
                fee,
                memo
            );
            toast.success(`交易成功: ${selectedTag}`);
            // navigate("/some-path");
         } catch (error) {
            if (error.message === "Invalid string. Length must be a multiple of 4") {
               toast.success(`交易成功: ${selectedTag}`);
            } else {
               toast.error(`提交表单时出错: ${error.message}`);
            }
         }
      } else {
         toast.error("请在提交前选择一个标签。");
      }
   };

   return (
       <div className="w-full h-full flex justify-center items-center p-8">
          <div className="w-[460px] h-[700px] flex flex-col items-center justify-center">
             <div className="w-[460px] h-[700px] w-full flex flex-col p-7 justify-center items-center shadow-lg rounded-3xl bg-clip-padding bg-opacity-5 border border-[#BE7123] backdrop-blur-[5px]">
                <h1 className="text-3xl uppercase font-bold text-primary-default">mytags</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full">
                   <div className="w-[400px] h-[500px] mb-9 w-full gradient-button rounded-2xl overflow-hidden shadow-lg relative text-white flex flex-col p-4 overflow-y-auto bg-gray-800 custom-scrollbar">
                      <div className="flex flex-col space-y-2">
                         {tags.map(tag => (
                             <button
                                 type="button"
                                 key={tag}
                                 onClick={() => handleClick(tag)}
                                 className={`p-2 bg-gradient-blue rounded-xl cursor-pointer ${selectedTag === tag ? 'outline outline-2 outline-blue-500 shadow-lg' : ''}`}
                             >
                                {tag}
                             </button>
                         ))}
                      </div>
                   </div>
                   <button
                       type="submit"
                       className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                   >
                      添加标签
                   </button>
                </form>
             </div>
          </div>
          <ToastContainer />
       </div>

   );
};

export default CreateTags;
