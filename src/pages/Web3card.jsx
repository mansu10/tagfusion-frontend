import React, { useState, useEffect } from "react";
import { axiosInstance, profileImageUrlPrefix } from "../config/config";
import Web3CreateCard from "../components/Web3CreateCard";
import { useLocation } from "react-router-dom";
import '../assets/customStyles.css'; // 引入自定义CSS文件

const getAddress = async () => {
   let address = localStorage.getItem("tura_address");
   if (address) {
      return address;
   }

};

const Web3card = () => {
   const [data, setData] = useState(null);
   const [selectedTag, setSelectedTag] = useState(null);
   const [copySuccess, setCopySuccess] = useState(false);
   const location = useLocation();

   useEffect(() => {
      const fetchData = async () => {
         const address = await getAddress();
         const response = await axiosInstance.get('tagfusion/api/login/get_info', {
            params: { address }
         });
         setData(response.data);
      };
      if (location.pathname === '/card') {
         fetchData();
      }
   }, [location]);

   const copyProfile = () => {
      const profileText = `
         Username: ${data.info.username[0]}
         Address: ${data.info.address}
         Bio: ${data.info.bio[0]}
         Link: ${data.info.link[0]}
         Tag: ${selectedTag ? selectedTag.tag_name : ''}
      `;
      //Tag: ${selectedTag ? selectedTag.tag_name + (selectedTag.status ? ' (Verified)' : ' (Not Verified)') : ''}
      navigator.clipboard.writeText(profileText).then(() => {
         setCopySuccess(true);
         setTimeout(() => setCopySuccess(false), 3000); // 提示信息显示3秒后消失
      }).catch(err => {
         console.error("Could not copy text: ", err);
      });
   };

   if (!data) {
      return null; // 或者加载状态
   }

   if (data.code === 1) {
      return <Web3CreateCard />;
   }

   const profileImageUrl = profileImageUrlPrefix + `/${data.info.profile_image[0]}`; // 替换成你的基本 URL

   return (
       <div className="w-full h-full flex justify-around items-center p-8">
          {/* 标签部分 */}
          <div className="w-[460px] h-[650px] flex flex-col items-center justify-center">
             <div className="w-[460px] h-[650px] flex flex-col p-7 justify-center items-center shadow-lg rounded-3xl bg-clip-padding bg-opacity-5 border border-[#BE7123] backdrop-blur-[5px]">
                <h1 className="text-3xl uppercase font-bold text-primary-default">mytags</h1>
                <div className="mb-9 w-[400px] h-[500px] w-full gradient-button rounded-2xl overflow-hidden shadow-lg relative text-white flex flex-col p-4 overflow-y-auto bg-gray-800 custom-scrollbar">
                   {data.info.tags.map((tag, index) => (
                       <div
                           key={index}
                           className={`p-2 bg-gradient-blue rounded-xl mb-2 cursor-pointer ${selectedTag === tag ? 'outline outline-2 outline-blue-500 shadow-lg' : ''}`}
                           onClick={() => setSelectedTag(tag)}
                       >
                          <div>{tag.tag_name} ({tag.status ? 'Verified' : 'Not Verified'})</div>
                       </div>
                   ))}
                </div>
             </div>
          </div>




          {/* 卡片部分 */}
          <div className="w-[460px] h-[650px] flex flex-col items-center justify-center">
             <div className="w-[460px] h-[650px] flex flex-col p-7 justify-center items-center shadow-lg rounded-3xl bg-clip-padding bg-opacity-5 border border-[#BE7123] backdrop-blur-[5px]">
                <h1 className="text-3xl uppercase font-bold text-primary-default">profile</h1>
                <div className="w-[400px] h-[500px] w-full gradient-button rounded-2xl overflow-hidden shadow-lg relative text-white flex flex-col">
                   <div className="px-8 py-5">

                      <div className="mt-2 flex flex-col items-center">
                         <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden">
                            <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                         </div>
                         <div className="mt-4 text-lg font-bold">{data.info.username[0]}</div>
                         <div className="mt-2 text-sm text-white/80 underline">{data.info.address}</div>
                         <div className="mt-4 text-center text-xs">
                            <p>{data.info.bio[0]}</p>
                         </div>
                         <div className="w-full h-5 mt-4 text-center text-xs  rounded flex items-center justify-center">
                            {selectedTag ? (
                                <div>
                                   <p>Tag: {selectedTag.tag_name}</p>
                                </div>
                            ) : (
                                <p></p> // 空的 p 标签确保该部分始终显示，即使没有内容
                            )}
                         </div>
                         <div className="my-4 flex justify-center space-x-14">
                            <a href={data.info.link[0]} target="_blank" rel="noopener noreferrer" className="rounded-full bg-black/20 backdrop-blur-3xl p-2">
                               <img src="/icons/twitter.svg" alt="twitter" className="w-5 h-fit invert object-cover" />
                            </a>
                            <div className="rounded-full bg-black/20 backdrop-blur-3xl p-2">
                               <img src="/icons/linkedin.svg" alt="linkedin" className="w-5 h-fit invert object-cover" />
                            </div>
                         </div>
                      </div>
                      <div className="text-xs">
                         <p>Trust Online World 3.0 Social Network Where Trust Diffuses</p>
                      </div>
                   </div>
                   <div className="text-lg font-bold mt-auto px-8 py-4 bg-black/20 backdrop-blur-3xl flex justify-end items-center gap-2">
                      <img src="/icons/logo.png" alt="logo" className="w-10 object-contain rounded" />
                   </div>
                </div>
                <div className="w-full flex justify-between pt-4">
                   <div className="text-white underline flex gap-2 items-center cursor-pointer" onClick={copyProfile}>
                      <img src={copySuccess ? "/icons/tick.svg" : "/icons/copy.svg"} alt="copy" className="w-5 h-5" />
                      {copySuccess ? "replicated data!" : "copy my profile"}
                   </div>
                </div>
             </div>
          </div>
       </div>
   );
};

export default Web3card;
