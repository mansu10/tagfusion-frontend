import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SigningStargateClient, assertIsBroadcastTxSuccess, GasPrice } from "@cosmjs/stargate";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance, turaChainId} from "../config/config.js";
import axios from "axios";

const CreateTags = () => {
   const [selectedTag, setSelectedTag] = useState(null);
   const [selectedCategory, setSelectedCategory] = useState(null);
   const [keplrLoaded, setKeplrLoaded] = useState(false);
   const [categories, setCategories] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      const loadKeplr = async () => {
         if (window.keplr) {
            await window.keplr.enable(turaChainId); // 替换为你的链 ID
            setKeplrLoaded(true);
         } else {
            toast.error("Please install the Keplr plug-in");
         }
      };

      const fetchCategories = async () => {
         try {

            toast.info("Tags Loading...", {
               position: "top-right", // 设置位置为右上角
               autoClose: false,
               hideProgressBar: true,
               closeOnClick: false,
               pauseOnHover: false,
               draggable: false,
               progress: undefined,
               theme: "colored",
               type: "info",
               icon: false

            });
            const response = await axiosInstance.get('tagfusion/api/get_cards/');
            const result = await response.data;
            if (result.code === 0) {
               setCategories(result.data);
               if (result.data.length > 0) {
                  setSelectedCategory(result.data[0].category_name); // 默认选中第一个标签类别
               }
            } else {
               toast.error(`ERROR`);
            }
            toast.dismiss();
         } catch (error) {
            toast.error(`ERROR : ${error.message}`);
         }
      };

      loadKeplr();
      fetchCategories();
   }, []);

   const handleCategoryClick = (category) => {
      setSelectedCategory(category);
      setSelectedTag(null); // 重置选中的标签
   };

   const handleClick = (tag) => {
      setSelectedTag(tag);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (selectedTag) {
         if (!keplrLoaded) {
            toast.error("Keplr is not loaded");
            return;
         }

         try {
            const chainId = turaChainId; // 替换为你的链 ID
            const address = localStorage.getItem('tura_address');
            if (!address) {
               toast.error("Please connect wallet");
               return;
            }

            const toAddress = address;
            const denom = "utura";
            const toSend = "100000000"; // 最小交易金额

            const offlineSigner = window.getOfflineSigner(chainId);
            const signingClient = await SigningStargateClient.connectWithSigner(
                "http://43.135.26.222:26657", // 替换为你的节点 RPC URL
                offlineSigner
            );

            const fee = {
               amount: [{ denom: "utura", amount: "500" }], // 调整为你的交易费用
               gas: "200000",
            };

            const memo = JSON.stringify({
               tag_version: "tag1.0",
               type: "addTag",
               category_name : selectedCategory,
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
            toast.success(`Transaction Successfully: ${selectedTag}`);
            // navigate("/some-path");
         } catch (error) {
            if (error.message === "Invalid string. Length must be a multiple of 4") {
               toast.success(`Transaction Successfully: ${selectedTag}`);
            } else {
               toast.error(`Submit Error: ${error.message}`);
            }
         }
      } else {
         toast.error("Please select tag");
      }
   };

   return (
       <div className="w-full h-full flex justify-center items-center p-8 my-8">
          <div className="flex mt-24">

             {/* 左侧导航 */}
             <div className="w-[200px] h-[700px] flex flex-col space-y-4 p-4 bg-opacity-50 rounded-3xl text-white mr-4 overflow-y-auto custom-scrollbar">

                {categories.map((category) => (
                    <button
                        key={category.category_name}
                        className={`p-2 text-center text-green-600 rounded-xl border border-[#BE7123] transition-all duration-200 
                        ${selectedCategory === category.category_name ? 'outline outline-1 outline-[#BE7123]' : ''} 
                        hover:shadow-[0_0_0_2px_#BE7123]`}
                        onClick={() => handleCategoryClick(category.category_name)}
                    >
                       {category.category_name}
                    </button>
                ))}
             </div>





             {/* 卡片 */}
             <div className="w-[460px] h-[700px] flex flex-col items-center justify-center ">
                <div className="w-[460px] h-[700px] w-full flex flex-col p-7 justify-center items-center shadow-lg rounded-3xl bg-clip-padding bg-opacity-5 border-2 border-[#BE7123] backdrop-blur-[5px]">
                   <h1 className="text-3xl uppercase font-bold text-green-600">mytags</h1>
                   <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full">
                      {/*<div className="w-[400px] h-[500px] mb-9 w-full gradient-button rounded-2xl overflow-hidden shadow-lg relative text-white flex flex-col p-4 overflow-y-auto bg-gray-800 custom-scrollbar">*/}
                      {/*<div className="bg-opacity-5 w-[400px] h-[500px] mb-9 w-full bg-white text-gray-700 rounded-2xl overflow-hidden shadow-lg relative flex flex-col p-4 overflow-y-auto border border-gray-300 custom-scrollbar">*/}
                      <div className="bg-opacity-5 w-[400px] h-[500px] mb-9 w-full border border-[#BE7123] text-gray-700 rounded-2xl overflow-hidden shadow-lg relative flex flex-col p-4 overflow-y-auto custom-scrollbar">

                         <div className="flex flex-col space-y-2">
                            {categories
                                .filter((category) => category.category_name === selectedCategory)
                                .flatMap((category) => category.tags)
                                .map((tag) => (
                                    <button
                                        type="button"
                                        key={tag}
                                        onClick={() => handleClick(tag)}
                                        className={`p-2 border border-[#BE7123] rounded-xl cursor-pointer text-green-600 transition-all duration-200 ${selectedTag === tag ? 'outline outline-1 outline-[#BE7123] shadow-lg' : ''} hover:shadow-[0_0_0_2px_#BE7123]`}
                                    >
                                       {tag}
                                    </button>
                                ))}
                         </div>

                      </div>

                      <button
                          type="submit"
                          className="px-4 py-2 font-medium text-green-600 rounded-xl border border-[#BE7123] transition-all duration-200 hover:shadow-[0_0_0_2px_#BE7123]"
                      >
                         Add Tag
                      </button>
                      {/*focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2*/}
                   </form>
                </div>
             </div>
          </div>
          <ToastContainer />
       </div>
   );
};

export default CreateTags;
