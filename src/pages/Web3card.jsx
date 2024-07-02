import React, { useState, useEffect } from "react";
import { axiosInstance, profileImageUrlPrefix } from "../config/config";
import Web3CreateCard from "../components/Web3CreateCard";
import {useLocation, useNavigate} from "react-router-dom";
import '../assets/customStyles.css'; // 引入自定义CSS文件

const getAddress = async () => {
   let address = localStorage.getItem("tura_address");
   if (address) {
      return address;
   }
};

const Web3card = () => {
   const [data, setData] = useState({
      code: 2,
      info: {
         tags: [],
         username: [""],
         address: "",
         bio: [""],
         link: [""],
         profile_image: [""],
      },
   });
   const [selectedTag, setSelectedTag] = useState(null);
   const [copySuccess, setCopySuccess] = useState(false);
   const [status, setStatus] = useState(false);
   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         const address = await getAddress();
         const response = await axiosInstance.get('tagfusion/api/login/get_info/', {
            params: { address }
         });
         setData(response.data);
         if(response.data.code === 0){
            localStorage.setItem("tura_login_status", true);
            setStatus(true)
         }

      };

      if (location.pathname === '/card') {
         fetchData();
      }
   }, [location]);

   // const copyProfile = () => {
   //    const profileText = `
   //       Username: ${data.info.username[0]}
   //       Address: ${data.info.address}
   //       Bio: ${data.info.bio[0]}
   //       Link: ${data.info.link[0]}
   //       Tag: ${selectedTag ? selectedTag.tag_name : ''}
   //    `;
   //    navigator.clipboard.writeText(profileText).then(() => {
   //       setCopySuccess(true);
   //       setTimeout(() => setCopySuccess(false), 3000); // 提示信息显示3秒后消失
   //    }).catch(err => {
   //       console.error("Could not copy text: ", err);
   //    });
   // };
   const copyProfile = () => {
      const profileText = `
        Username: ${data.info.username[0]}
        Address: ${data.info.address}
        Bio: ${data.info.bio[0]}
        Link: ${data.info.link[0]}
        Tag: ${selectedTag ? selectedTag.tag_name : ''}
    `;

      const textArea = document.createElement("textarea");
      textArea.value = profileText;
      textArea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
         document.execCommand('copy');
         setCopySuccess(true);
         setTimeout(() => setCopySuccess(false), 3000); // 提示信息显示3秒后消失
      } catch (err) {
         console.error("Could not copy text: ", err);
      }

      document.body.removeChild(textArea);
   };

   let profileImageUrl = ""
   if(data.code === 0){
      profileImageUrl = profileImageUrlPrefix + `/${data.info.profile_image[0]}`; // 替换成你的基本 URL
   }


   if(data.code === 1){
      return <Web3CreateCard />
   }
   if(localStorage.getItem("tura_login_status")){
      return (
          <div className="w-full h-full flex justify-around items-center p-8">
             {/* 标签部分 */}
             <div className="w-[460px] h-[650px] flex flex-col items-center justify-center my-28">
                <div className="w-[460px] h-[650px] flex flex-col p-7 justify-center items-center shadow-lg rounded-3xl bg-clip-padding bg-opacity-5 border border-[#BE7123] backdrop-blur-[5px]">
                   <h1 className="text-3xl uppercase font-bold text-primary-default">mytags</h1>
                   <div className="mb-9 w-[400px] h-[500px] w-full gradient-button rounded-2xl overflow-hidden shadow-lg relative text-white flex flex-col p-4 overflow-y-auto bg-gray-800 custom-scrollbar">
                      {data.info.address === "" ? (
                          <>
                             {/*<div className="p-2 bg-gradient-blue rounded-xl mb-2 cursor-pointer">*/}
                             {/*   <div>Loading...</div>*/}
                             {/*</div>*/}

                          </>
                      ) : (
                          data.info.tags.map((tag, index) => (
                              <div
                                  key={index}
                                  className={`p-2 bg-gradient-blue rounded-xl mb-2 cursor-pointer ${selectedTag === tag ? 'outline outline-2 outline-blue-500 shadow-lg' : ''}`}
                                  onClick={() => setSelectedTag(tag)}
                              >
                                 <div>{tag.tag_name} ({tag.status ? 'Verified' : 'Not Verified'})</div>
                              </div>
                          ))
                      )}
                   </div>
                </div>
             </div>

             {/* 卡片部分 */}
             <div className="w-[460px] h-[650px] flex flex-col items-center justify-center my-28">
                <div className="w-[460px] h-[650px] flex flex-col p-7 justify-center items-center shadow-lg rounded-3xl bg-clip-padding bg-opacity-5 border border-[#BE7123] backdrop-blur-[5px]">
                   <h1 className="text-3xl uppercase font-bold text-primary-default">profile</h1>
                   <div className="w-[400px] h-[500px] w-full gradient-button rounded-2xl overflow-hidden shadow-lg relative text-white flex flex-col">
                      <div className="px-8 py-5">
                         <div className="mt-2 flex flex-col items-center">
                            {profileImageUrl === "" ? (
                                <>
                                   <div className="w-28 h-28  rounded-full overflow-hidden">
                                   </div>
                                </>
                            ):
                                (
                                    <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden">
                                       <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                )
                            }
                            <div className="mt-12 text-lg font-bold">{data.info.username[0] }</div>
                            {/*<div className="mt-8 text-sm text-white/80 underline">{data.info.address || "Loading..."}</div>*/}
                            <div className="mt-8 text-lg text-sm text-white/80 underline">{data.info.address}</div>
                            <div className="mt-8 text-lg text-center text-xs">
                               <p>{data.info.bio[0] }</p>
                            </div>
                            <div className="mt-8 w-full h-5 mt-4 text-center text-xs  rounded flex items-center justify-center">
                               {selectedTag ? (
                                   <div>
                                      <p>Tag: {selectedTag.tag_name}</p>
                                   </div>
                               ) : (
                                   <p></p> // 空的 p 标签确保该部分始终显示，即使没有内容
                               )}
                            </div>

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
      )   }
};

export default Web3card;
