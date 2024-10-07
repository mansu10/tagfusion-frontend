import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  SigningStargateClient,
  assertIsBroadcastTxSuccess,
  GasPrice,
} from "@cosmjs/stargate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance, turaChainId, endpoint_rpc } from "../config/config.js";
import PanelBox from "../components/PanelBox"
import TFButton from '../components/TFButton';

const PageTags = () => {
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
           icon: false,
         });
         const response = await axiosInstance.get("tagfusion/api/get_cards/");
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
         const address = localStorage.getItem("tura_address");
         if (!address) {
           toast.error("Please connect wallet");
           return;
         }

         const toAddress = address;
         const denom = "utura";
         const toSend = "1000000"; // 最小交易金额

         const offlineSigner = window.getOfflineSigner(chainId);
         const signingClient = await SigningStargateClient.connectWithSigner(
           endpoint_rpc, // 替换为你的节点 RPC URL
           offlineSigner
         );

         const fee = {
           amount: [{ denom: "utura", amount: "500" }], // 调整为你的交易费用
           gas: "200000",
         };

         const memo = JSON.stringify({
           tag_version: "tag1.0",
           type: "addTag",
           category_name: selectedCategory,
           tag_name: selectedTag,
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
         if (
           error.message === "Invalid string. Length must be a multiple of 4"
         ) {
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
    <>
      <div className="flex justify-center pt-[100px] px-[18px] relative z-10">
        <PanelBox title="Create Your Tags" className="w-full">
          <div className="flex justify-center items-center md:items-start flex-col md:flex-row">
            {categories.map((category, idx) => (
              <div
                key={category.category_name}
                onClick={() => handleCategoryClick(category.category_name)}
                className={`flex justify-center w-[180px] mx-[10px] mb-[20px] md:mb-0 px-[32px] py-[8px] rounded-[8px] border border-[#FFFFFF33] text-white text-[16px] md:text-[18px] hover:bg-btngreen cursor-pointer transition-all ${
                  selectedCategory === category.category_name
                    ? "bg-btngreen"
                    : ""
                }`}
              >
                {category.category_name}
              </div>
            ))}
          </div>
          <div className="flex items-center pb-[30px] pt-[10px]  md:py-[40px]">
            <div className="flex-1 w-full h-[1px] bg-[#ffffffa3]"></div>
            <div className="mx-[20px] md:mx-[72px] text-[#FFFFFF8A] text-[14px] md:text-[16px]">
              Please Select Tags
            </div>
            <div className="flex-1 w-full h-[1px] bg-[#ffffffa3]"></div>
          </div>
          <div className="min-h-[200px]">
            <div className="grid grid-cols-3 gap-x-[20px] gap-y-[20px] md:gap-x-[30px] md:gap-y-[30px] w-full md:w-[690px] text-[#FFFFFF8A] text-[14px] md:text-[16px]">
              {categories
                .filter(
                  (category) => category.category_name === selectedCategory
                )
                .flatMap((category) => category.tags)
                .map((tag) => (
                  <div
                    key={tag}
                    onClick={() => handleClick(tag)}
                    className={`flex justify-center items-center p-[8px] border border-[#FFFFFF1F] bg-[#FFFFFF1A] hover:border-[#FFA000] cursor-pointer hover:text-[#FF6F00] transition-all ${
                      selectedTag === tag
                        ? "border-[#FFA000FF] text-[#FF6F00]"
                        : ""
                    }`}
                  >
                    {tag}
                  </div>
                ))}
            </div>
          </div>

          <TFButton
            className="w-full mt-[50px] md:mt-[60px] leading-[20px]"
            onClick={handleSubmit}
          >
            Create
          </TFButton>
        </PanelBox>
      </div>
      <ToastContainer />
    </>
  );
}

export default PageTags