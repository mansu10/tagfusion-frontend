import React, { useState, useEffect } from "react";
import { axiosInstance, profileImageUrlPrefix } from "../config/config";
import Web3CreateCard from "../components/Web3CreateCard";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import '../assets/customStyles.css'; // 引入自定义CSS文件
import {UserAvatar, UserAvatarBig} from '../components/Avatar.jsx';

const getAddress = async () => {
   let address = localStorage.getItem("tura_address");
   if (address) {
      return address;
   }
};

const Web3TagAward = () => {

   const [data, setData] = useState({
      code : 1,
      register_award : 0,
      register_ct    : 0,
      verify_award   : 0,
      verify_ct      : 0,
      invite_one_award   : 0,
      invite_one_ct      : 0,
      invite_two_award   : 0,
      invite_two_ct      : 0,
      invite_three_award : 0,
      invite_three_ct    : 0,
      total_award    : 0,
      top50:[],
      profile_image : ""
      }
   );
   const [selectedTag, setSelectedTag] = useState(null);
   // const [status, setStatus] = useState(false);
   const location = useLocation();


   useEffect(() => {

      const fetchData = async () => {
         const address = await getAddress();
         toast.info("Loading...", {
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
         const response = await axiosInstance.get('tagfusion/api/get_award/', {
            params: { address }
         });
         setData(response.data);
         toast.dismiss();
      };

      if (location.pathname === '/award') {
         fetchData();
      }
   }, [location]);

   const formatNumber = (number) => {
      return new Intl.NumberFormat().format(number);
   };
   let profileImageUrl = ""
   if (data.code === 0) {
      profileImageUrl = profileImageUrlPrefix + `/${data.profile_image}`; // 替换成你的基本 URL
   }
   console.log( getAddress())
   console.log(data)
      return (
         <>
            <div className="w-full h-full flex flex-wrap justify-center md:justify-around items-center max-w-[1200px] mx-auto py-12">


               {/* 标签部分 */}
               <div className="w-full h-[36em] max-w-[460px] max-h-[650px] md:w-[45%] flex flex-col items-center justify-center md:my-28 mt-12">
                  <div className="w-full h-full flex flex-col p-7 justify-center items-center shadow-lg rounded-3xl bg-clip-padding bg-opacity-5 border-2 border-[#BE7123] backdrop-blur-[5px]">
                     <h1 className="text-3xl font-bold text-center  mt-6">My Rewards</h1>
                     <hr className="border-green-600" style={{ height: '4px', marginBottom: '24px' }} />

                     <div className="text-lg w-full px-0">
                        <div className="mb-2">
                           <div className="flex justify-between items-center">
                              <span className="font-bold">Current Reward</span>
                              <span className="font-bold ml-auto">{formatNumber(data.total_award)} Tags</span>
                           </div>
                        </div>
                        <hr className="my-2" />

                        <div className="mb-2">
                           <div className="flex justify-between items-center">
                              <span className="font-bold">Member Reward</span>
                              <span className="font-bold ml-auto">{formatNumber(data.register_award)} Tags</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-sm italic">Tagger DAO Member:</span>
                              <span className="text-sm italic ml-auto pr-10">+{formatNumber(data.register_award)}</span>
                           </div>
                        </div>
                        <hr className="my-2" />

                        <div className="mb-2">
                           <div className="flex justify-between items-center">
                              <span className="font-bold">Verification Reward</span>
                              <span className="font-bold ml-auto">{formatNumber(data.verify_award)} Tags</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-sm italic">Total Count:</span>
                              <span className="text-sm italic ml-auto pr-10">+{formatNumber(data.verify_ct)}</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-sm italic">Verified Tags:</span>
                              <span className="text-sm italic ml-auto pr-10">+{formatNumber(data.verify_award)}</span>
                           </div>
                        </div>
                        <hr className="my-2" />
                        <div className="mb-2">
                           <div className="flex justify-between items-center">
                              <span className="font-bold">Refer Reward</span>
                              <span className="font-bold ml-auto">{formatNumber(data.invite_one_award + data.invite_two_award + data.invite_three_award)} Tags</span>
                           </div>
                        </div>
                        <div className="mb-2">
                           <div className="flex justify-between items-center">
                              <span className="font-semibold">Layer1 Refer</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-sm italic">L1 Count:</span>
                              <span className="text-sm italic ml-auto pr-10">+{formatNumber(data.invite_one_ct)}</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-sm italic">L1 Invite Friends:</span>
                              <span className="text-sm italic ml-auto pr-10">+{formatNumber(data.invite_one_award)}</span>
                           </div>
                        </div>
                        <div className="mb-2">
                           <div className="flex justify-between items-center">
                              <span className="font-semibold">Layer2 Refer</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-sm italic">L2 Count:</span>
                              <span className="text-sm italic ml-auto pr-10">+{formatNumber(data.invite_two_ct)}</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-sm italic">L2 Invite Friends:</span>
                              <span className="text-sm italic ml-auto pr-10">+{formatNumber(data.invite_two_award)}</span>
                           </div>
                        </div>
                        <div className="mb-2">
                           <div className="flex justify-between items-center">
                              <span className="font-semibold">Layer3 Refer</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-sm italic">L3 Count:</span>
                              <span className="text-sm italic ml-auto pr-10">+{formatNumber(data.invite_three_ct)}</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-sm italic">L3 Invite Friends:</span>
                              <span className="text-sm italic ml-auto pr-10">+{formatNumber(data.invite_three_award)}</span>
                           </div>
                        </div>
                        <hr className="my-2" />
                     </div>
                  </div>
               </div>







               <div className="w-full h-[36em]  max-w-[460px] max-h[650px] md:w-[45%] flex flex-col items-center justify-center md:my-28 mt-12" >
                  <div className="w-full h-full flex flex-col p-7 justify-center items-center shadow-lg rounded-3xl bg-clip-padding bg-opacity-5 border-2 border-[#BE7123] backdrop-blur-[5px]">
                     <h1 className="text-3xl uppercase font-bold text-green-600">Leaderboard</h1>
                     <div className="border border-[#BE7123] bg-opacity-5 mb-9 w-full h-full bg-white text-gray-700 rounded-2xl overflow-hidden shadow-lg relative flex flex-col p-4 overflow-y-auto custom-scrollbar">
                        {data.top50.map((top, index) => (
                            <div
                                key={index}
                                className={`p-2 border border-[#BE7123] rounded-xl text-green-600 transition-all duration-200 ${
                                    index === 0 ? ' shadow-lg' : ''
                                } flex items-center mb-4 relative`}
                            >
                               <UserAvatar username={top.username} />
                               <div className="flex-grow">
                                  <div className="font-bold">{top.username}</div>
                                  <div>{formatNumber(top.total_award)} TAGS</div>
                               </div>
                               <div className="absolute right-2 top-1/2 transform -translate-y-1/2 font-normal">
                                  #{top.raking}
                               </div>
                            </div>
                        ))}
                     </div>
                  </div>
               </div>

            </div>
            <ToastContainer />
         </>
      )

};

export default Web3TagAward;
